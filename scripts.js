/**
 * @version 0.2.0
 */
Field = {
    puppetMode: true,
    maxNumbers: 30,
    binMaxNumbers: 0,
    explodedBin: [],
    finished: false,
    printBox(id) {
        var div = document.createElement('div');
        div.setAttribute('id', id);
        div.classList.add('box');
        document.getElementById('field').appendChild(div)
    },
    printBoxes() {
        var boxNumbers = this.binMaxNumbers.toString().length;
        for (i = 0; i < boxNumbers; i++) Field.printBox(i);
    },
    fillBoxByNumber(number) {
        binary = dec2bin(number);
        this.explodedBin = binary.split('').reverse();
        this.explodedBin.forEach(function (bin, i) {
            if (parseInt(bin) === 1) {
                if (Field.puppetMode) var numberBox = Field.getNumberImage(number);
                else var numberBox = Field.getNumberBox(number);
                document.getElementById(i).appendChild(numberBox);
            }
        });
    },
    getNumberBox(number) {
        var box = document.createElement('span');
        box.classList.add('number');
        box.innerText = number;
        return box;
    },
    getNumberImage(number) {
        var image = document.createElement('img');
        image.classList.add('image');
        image.setAttribute('src', 'images/' + number + '.svg')
        return image;
    },
    setBoxListeners() {
        let boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            this.boxListener(box);
        });
    },
    boxListener(box) {
        box.addEventListener('click', () => {
            box.setAttribute('disabled', 'disabled');
            box.classList.add('selected');
            this.explodedBin[box.id] = 1;
            document.getElementById('done').disabled = false;
        });
    },
    emptyExplodedBin() {
        for (var i in this.explodedBin) {
            this.explodedBin[i] = 0;
        }
    },
    empty() {
        document.getElementById('field').innerHTML = '';
    },
    init() {
        this.binMaxNumbers = dec2bin(this.maxNumbers);

        this.printBoxes();

        for (i = 1; i <= this.maxNumbers; i++) this.fillBoxByNumber(i);

        this.emptyExplodedBin();

        this.setBoxListeners();

        document.getElementById('done').disabled = true;
    },
    revealImage(number) {
        var numberImage = Field.getNumberImage(number);
        numberImage.classList.add('revealed');
        document.getElementById('field').appendChild(numberImage);
    },
    start() {

        this.init();

        // this.appendButtonToEnd();
        document.getElementById('done').addEventListener('click', () => {
            if (this.finished === false) {
                this.finished = true;
                this.explodedBin = this.explodedBin.reverse();
                var binary = this.explodedBin.join('');
                var number = parseInt(binary, 2);
                Field.empty();
                if (this.puppetMode) Field.revealImage(number);
                else alert(number);
                // this.init();
            } else location.reload();
        });
    }
}

Field.start();

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}