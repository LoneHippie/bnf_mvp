//DOM shortcuts

const surveyUI = {
    question: [document.getElementById('q-0'), document.getElementById('q-1'), document.getElementById('q-2'), document.getElementById('q-3')],
    next: [document.getElementById('btn-next-0'), document.getElementById('btn-next-1'), undefined],
    back: [undefined, document.getElementById('btn-back-1'), document.getElementById('btn-back-2')],
    measureImperial: document.getElementById('input-container-imperial'),
    measureMetric: document.getElementById('input-container-metric'),
    btnMeasureSwitch: document.getElementById('btn-unit-switch'),

    inputFt: document.getElementById('height-feet'),
    inputIn: document.getElementById('height-inch'),
    inputLb: document.getElementById('weight-lb'),

    inputCm: document.getElementById('height-cm'),
    inputKg: document.getElementById('weight-kg'),

    next0: document.getElementsByClassName('btn-q0'),
    next1: document.getElementById('btn-q1'),
    next2: document.getElementsByClassName('btn-q2')
};

const hwDataImperial = [surveyUI.inputFt, surveyUI.inputIn, surveyUI.inputLb];
const hwDataMetric = [surveyUI.inputCm, surveyUI.inputKg];

//init state
for (i = 0; i < surveyUI.question.length; i++) {
    surveyUI.question[i].classList.remove('active');
}
surveyUI.question[0].classList.add('active');

//front-end functionality

//next for question 0
for (i = 0; i < surveyUI.next0.length; i++) {
    surveyUI.next0[i].addEventListener('click', function() {
        surveyUI.question[0].classList.remove('active');
        surveyUI.question[1].classList.add('active');
    });
};

//next for question 1
surveyUI.next1.addEventListener('click', function() {
    surveyUI.question[1].classList.remove('active');
    surveyUI.question[2].classList.add('active');
});

//button for switching between metric and imperial measurement (question 1)
surveyUI.btnMeasureSwitch.addEventListener('click', function() {

    if (surveyUI.measureImperial.classList.contains('active')) {
        for (el of hwDataImperial) { //resets all values to empty
            el.value = '';
        }
        surveyUI.measureImperial.classList.remove('active');
        surveyUI.measureMetric.classList.add('active');
    } else if (surveyUI.measureMetric.classList.contains('active')) {
        for (el of hwDataMetric) { //resets all values to empty
            el.value = '';
        }
        surveyUI.measureMetric.classList.remove('active');
        surveyUI.measureImperial.classList.add('active');
    }
    
});

//check to see if all fields are filled
setInterval(() => { //find a way to make this interval only run while question[1] is active

    if (surveyUI.measureImperial.classList.contains('active')) {
        let checkImp = hwDataImperial.every(el => el.value !== '');
        
        if (checkImp == true) {
            surveyUI.next1.classList.add('active');
        } else {
            surveyUI.next1.classList.remove('active');
        }
    } 

    if (surveyUI.measureMetric.classList.contains('active')) {
        let checkImp = hwDataMetric.every(el => el.value !== '');
        
        if (checkImp == true) {
            surveyUI.next1.classList.add('active');
        } else {
            surveyUI.next1.classList.remove('active');
        }
    }

}, 500);

for (i = 0; i < surveyUI.next2.length; i++) {
    surveyUI.next2[i].addEventListener('click', function() {
        surveyUI.question[2].classList.remove('active');
        surveyUI.question[3].classList.add('active');
    });
};