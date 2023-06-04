// Expansion of textarea
document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('expandable-textarea');
  const submitButton = document.getElementById('submit-button');
  const headerInfoPar = document.querySelector('.header-info-par');

  textarea.addEventListener('focus', function () {
    textarea.classList.add('expanded');
    submitButton.classList.add('visible');
  });

  // Hide header information paragraph and show submit button on focus
  textarea.addEventListener('focus', function () {
    textarea.classList.add('expanded');
    submitButton.classList.add('visible');
    submitButton.classList.remove('hidden');
    headerInfoPar.style.display = 'none';
  });
});

//Handle form submission
document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('expandable-textarea');
  const submitButton = document.getElementById('submit-button');

  /*
      EXTREMELY IMPORTANT! - Handles form submission
  */
  submitButton.addEventListener('click', async function (event) {
    event.preventDefault();

    const text = textarea.value.trim();

    if (!text) {
      textarea.value = 'Please enter some text.';
      return;
    }

    submitButton.disabled = true;
    submitButton.classList.add('disabled');

    // Send text chunk to the Express.js server for summarization
    try {

      var encodeResponse = await axios.post('http://localhost:3001/api/encode', { text });

      var summary = '';
      // for await (let snippet of encodeResponse.data.summary) {

      //   var openAIResponse = await axios.post('http://localhost:3001/api/summarize', { text: snippet});
      //   summary = summary + openAIResponse.data.summary;
      // }

      for(var i = 0; i < encodeResponse.data.summary.length; i++) {
        var openAIResponse = await axios.post('http://localhost:3001/api/summarize', { text: encodeResponse.data.summary[i].replace(/\n/g, ' ') });
        summary = summary + openAIResponse.data.summary;
        summary += '\n\n';
      }

      textarea.value = summary;
      console.log('Response received from server!');

    } catch (error) {
      console.error(error);
      textarea.value = error.message;
    }
    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
  });
});
  