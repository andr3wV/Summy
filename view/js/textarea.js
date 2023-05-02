// Function to expand textarea
function expandTextarea() {
    const textarea = document.getElementById('expandable-textarea');
    textarea.classList.add('expanded');
  }
  
  // Expand textarea and show submit button on focus
  document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('expandable-textarea');
    const submitButton = document.getElementById('submit-button');
  
    textarea.addEventListener('focus', function () {
      textarea.classList.add('expanded');
      submitButton.classList.add('visible');
      submitButton.classList.remove('hidden');
    });
  });
  
  // Typewrite effect
  class TxtType2 {
    constructor(element, words, wait = 2000) {
      this.element = element;
      this.words = words;
      this.loopNum = 0;
      this.wait = wait;
      this.txt = '';
      this.isDeleting = false;
      this.tick();
    }
  
    tick() {
      const i = this.loopNum % this.words.length;
      const fullTxt = this.words[i];
  
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.element.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  
      let delta = 200 - Math.random() * 100;
  
      if (this.isDeleting) {
        delta /= 2;
      }
  
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
  
      setTimeout(() => {
        this.tick();
      }, delta);
    }
  }
  
  // Initialize typewrite effect and handle form submission
  document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('expandable-textarea');
    const submitButton = document.getElementById('submit-button');
    const headerInfoPar = document.querySelector('.header-info-par');
  
    // Hide header information paragraph and show submit button on focus
    textarea.addEventListener('focus', function () {
      textarea.classList.add('expanded');
      submitButton.classList.add('visible');
      submitButton.classList.remove('hidden');
      headerInfoPar.style.display = 'none';
    });
  
    // Handle form submission
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();
  
      const text = textarea.value.trim();
  
      if (!text) {
        return;
      }
  
      console.log('Submit button clicked!');
  
      submitButton.disabled = true;
      submitButton.classList.add('disabled');
  
      console.log('Submit Button Disabled');
  
      // Send text to server for summarization
      try {
        const response = await axios.post('../../api/summarize', { text, timeout: 60000});
  
        textarea.value = response.data.summary;
      } catch (error) {
        console.error(error);
        textarea.value = error;
      }
  
      submitButton.disabled = false;
      submitButton.classList.remove('disabled');
  
      console.log('Submit Button Enabled');
    });
  
    // Initialize typewrite effect
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
      const period = elements[i].getAttribute('data-period');
      const text = JSON.parse(elements[i].getAttribute('data-type'));
      new TxtType2(elements[i], text, period);
    }
  });
  