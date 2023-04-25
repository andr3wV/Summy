function expandTextarea() {
    const textarea = document.getElementById('expandable-textarea');
    textarea.classList.add('expanded');
}

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('expandable-textarea');

    textarea.addEventListener('focus', function () {
        textarea.classList.add('expanded');
    });

    textarea.addEventListener('blur', function () {
        textarea.classList.remove('expanded');
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

    textarea.addEventListener('blur', function () {
        textarea.classList.remove('expanded');
        submitButton.classList.remove('visible');
        setTimeout(function () {
            submitButton.classList.add('hidden');
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const period = elements[i].getAttribute('data-period');
        const text = JSON.parse(elements[i].getAttribute('data-type'));
        new TxtType(elements[i], text, period);
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

    textarea.addEventListener('blur', function () {
        textarea.classList.remove('expanded');
        submitButton.classList.remove('visible');
        setTimeout(function () {
            submitButton.classList.add('hidden');
        }, 300);
        headerInfoPar.style.display = 'block';
    });
});

class TxtType {
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