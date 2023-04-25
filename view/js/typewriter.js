document.addEventListener('DOMContentLoaded', function() {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const period = elements[i].getAttribute('data-period');
        const text = JSON.parse(elements[i].getAttribute('data-type'));
        new TxtType(elements[i], text, period);
    }
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