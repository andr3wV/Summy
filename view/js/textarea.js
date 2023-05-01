function expandTextarea() {
    const textarea = document.getElementById('expandable-textarea');
    textarea.classList.add('expanded');
}

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('expandable-textarea');

    textarea.addEventListener('focus', function () {
        textarea.classList.add('expanded');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('expandable-textarea');
    const submitButton = document.getElementById('submit-button');

    textarea.addEventListener('focus', function () {
        textarea.classList.add('expanded');
        submitButton.classList.add('visible');
        submitButton.classList.remove('hidden');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const period = elements[i].getAttribute('data-period');
        const text = JSON.parse(elements[i].getAttribute('data-type'));
        new TxtType2(elements[i], text, period);
    }

    const textarea = document.getElementById('expandable-textarea');
    const submitButton = document.getElementById('submit-button');
    const headerInfoPar = document.querySelector('.header-info-par');

    textarea.addEventListener('focus', function () {
        textarea.classList.add('expanded');
        submitButton.classList.add('visible');
        submitButton.classList.remove('hidden');
        headerInfoPar.style.display = 'none';
    });

    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const text = textarea.value;
        console.log('Submit button clicked!');
        submitButton.disabled = true;
        submitButton.classList.add('disabled'); 
        console.log('Submit Button Disabled');
        setTimeout(() => {
            submitButton.disabled = false; 
            submitButton.classList.remove('disabled');
            console.log('Submit Button Enabled');
        }, 10000); 
        textarea.value = await summarizeText(text);
    });
});

class TxtType2 {
    constructor(element, words, wait) {
        this.element = element;
        this.words = words;
        this.loopNum = 0;
        this.wait = parseInt(wait, 10) || 2000;
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

// async function summarizeText(text) {

//     if(!text) return 'No text provided.';
//     try {
//          const response = await axios.post('http://localhost:3001/summarize', { text });
//          return response.data.summary;
//     } catch (error) {
//         return 'Error summarizing text. Please try again later.';
//     }
// }

/* -- POST REQUEST IMPLEMENTATION -- */

async function summarizeText(text) {

    if(!text) return 'No text provided.';
    
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"system": "You are an AI that summarizes text. Summarize all of the following text"}, {"role": "user", "content": text}],
      };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            data,
            { headers }
          );

          return response.data.choices[0].message.content;
    } catch (error) {
        return 'Error summarizing text. Please try again later.';
    }
}
