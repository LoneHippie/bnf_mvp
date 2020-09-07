//DOM shortcuts

const front = (function() {

    const surveyUI = {
        title: [document.getElementById('title-q0-q2'), document.getElementById('title-q3-q5'), document.getElementById('title-q6')],

        question: [document.getElementById('q-0'), document.getElementById('q-1'), document.getElementById('q-2'), document.getElementById('q-3'), document.getElementById('q-4'), document.getElementById('q-5'), document.getElementById('q-6')],

        measureImperial: document.getElementById('input-container-imperial'),
        measureMetric: document.getElementById('input-container-metric'),
        btnMeasureSwitch: document.getElementById('btn-unit-switch'),
    
        inputFt: document.getElementById('height-feet'),
        inputIn: document.getElementById('height-inch'),
        inputLb: document.getElementById('weight-lb'),
    
        inputCm: document.getElementById('height-cm'),
        inputKg: document.getElementById('weight-kg'),

        checkPart: document.getElementsByClassName('checkbox-part'),
        checkNone: document.getElementById('check-none'),
        checkAll: document.getElementsByClassName('question__checkbox'),
    
        next0: document.getElementsByClassName('btn-q0'),
        next1: document.getElementById('btn-q1'),
        next2: document.getElementsByClassName('btn-q2'),
        next3: document.getElementsByClassName('btn-q3'),
        next4: document.getElementsByClassName('btn-q4'),
        next5: document.getElementsByClassName('btn-q5'),

        results: document.getElementById('btn-final')
    };
    
    const hwDataImperial = [surveyUI.inputFt, surveyUI.inputLb];
    const hwDataMetric = [surveyUI.inputCm, surveyUI.inputKg];
    
    //init state
    for (i = 0; i < surveyUI.question.length; i++) {
        surveyUI.question[i].classList.remove('active');
    }
    surveyUI.question[0].classList.add('active');

    for (i = 0; i < surveyUI.title.length; i++) {
        surveyUI.title[i].classList.remove('active');
    }
    surveyUI.title[0].classList.add('active');
    
    //front-end functionality
    function btnNext(next, n) {
        for (i = 0; i < next.length; i++) {
            next[i].addEventListener('click', function() {
                surveyUI.question[n].classList.remove('active');
                surveyUI.question[n + 1].classList.add('active');

                if (n == 2) {
                    surveyUI.title[0].classList.remove('active');
                    surveyUI.title[1].classList.add('active');
                }
                if (n == 5) {
                    surveyUI.title[1].classList.remove('active');
                    surveyUI.title[2].classList.add('active');
                }
    
                document.getElementById('blip-' + [n]).classList.add('filled');
            });
        };
    }
    
    //next for multi-option questions
    btnNext(surveyUI.next0, 0);
    btnNext(surveyUI.next2, 2);
    btnNext(surveyUI.next3, 3);
    btnNext(surveyUI.next4, 4);
    btnNext(surveyUI.next5, 5);
    
    //next for question 1
    surveyUI.next1.addEventListener('click', function() {
        surveyUI.question[1].classList.remove('active');
        surveyUI.question[2].classList.add('active');

        if (surveyUI.inputIn.value == '') {
            surveyUI.inputIn.value = 0;
        }
    
        document.getElementById('blip-1').classList.add('filled');
    
        clearInterval(measureFormCheck); //stop interval function for checking form fill status
    });

    //UI and interval next for final question (q-6)
    surveyUI.results.addEventListener('click', function() {
        surveyUI.question[6].classList.remove('active');
        document.getElementById('blip-6').classList.add('filled');
        clearInterval(noneChecker);
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
    
    //check to see if all fields are filled (question 1)
    let measureFormCheck = setInterval(() => { //find a way to make this interval only run while question[1] is active
    
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
    
    //check to see if 'none' is checked or not (question 6)
    let noneChecker = setInterval(() => {
        if (surveyUI.checkNone.checked === true) {
            for (i = 0; i < surveyUI.checkPart.length; i++) {
                surveyUI.checkPart[i].disabled = true;
                surveyUI.checkPart[i].checked = false;
            }
        }
        if (surveyUI.checkNone.checked === false) {
            for (i = 0; i < surveyUI.checkPart.length; i++) {
                surveyUI.checkPart[i].disabled = false;
            }
        }

        if (Array.from(surveyUI.checkAll).some(el => el.checked == true)) {
            surveyUI.results.classList.add('active');
        } else {
            surveyUI.results.classList.remove('active');
        }
        
    }, 300);

//returns

    return {
        //returns surveyUI object with all DOM shortcuts
        surveyEL: function() {
            return {
                surveyUI
            }
        }
    }

})();

//console.log(front.surveyEL());

const dataBase = (function() {

    const Workout = function(name, type, subType, activity, location, equipment) {
        this.name = name; //workout name (string value)
        this.type = type; //0 = isolation, 1 = compound
        this.subType = subType; //body areas as an array, index 0 = primary, all subsequent index = secondary areas worked
        this.activity = activity; //0 = reps, 1 = holds
        this.location = location; //0 = indoor, 1 = outdoor, 2 = both
        this.equipment = equipment; //0 = no gear required, 1 = basic gear required, 2 = gym level gear required, 3 = full gym required
        this.reps; //generated by function
        
        this.getInitReps = function() { //uses this.activity to assign default hold or rep values
            if (this.activity == 0) {
                this.reps = [[14, 12, 10], [30, 30, 30], [30, 25, 20]]; //max starting rep level, to be reduced if needed
            } else {
                this.reps = 60; //for 60 seconds
            };
        }

        this.getInitReps();
    }

    //db - isolation
    const WO1 = new Workout('Dumbbell Overhead Press', 0, ['shoulder'], 0, 2, 1);
    const WO2 = new Workout('Lateral Raises', 0, ['shoulder'], 0, 2, 1);
    const WO3 = new Workout('Front Raises', 0, ['shoulder'], 0, 2, 1);
    const WO4 = new Workout('Rear Delt Flys', 0, ['shoulder'], 0, 2, 1);
    const WO5 = new Workout('Arnold Press', 0, ['shoulder'], 0, 2, 1);
    const WO6 = new Workout('Around The World', 0, ['shoulder'], 0, 2, 1);
    const WO7 = new Workout('Bumbbell Bicep Curls', 0, ['bicep'], 0, 2, 1);
    const WO8 = new Workout('Reverse Grip Curls', 0, ['bicep'], 0, 2, 1);
    const WO9 = new Workout('Hammer Curls', 0, ['bicep'], 0, 2, 1);
    const WO10 = new Workout('Incline Bench Curls', 0, ['bicep'], 0, 2, 1);
    const WO11 = new Workout('Cable Pull Downs', 0, ['tricep'], 0, 2, 1);
    const WO12 = new Workout('Overhead Extensions', 0, ['tricep'], 0, 2, 1);
    const WO13 = new Workout('Skull Crushers', 0, ['tricep'], 0, 2, 1);
    const WO14 = new Workout('Kick Backs', 0, ['tricep'], 0, 2, 1);
    const WO15 = new Workout('Dumbbell Bench Press', 0, ['chest'], 0, 2, 1);
    const WO16 = new Workout('Dumbbell Floor Press', 0, ['chest'], 0, 2, 1);
    const WO17 = new Workout('Incline Press', 0, ['chest'], 0, 2, 1);
    const WO18 = new Workout('Dumbbell Flys', 0, ['chest'], 0, 2, 1);
    const WO19 = new Workout('Cable Flys', 0, ['chest'], 0, 2, 2);
    const WO20 = new Workout('Barbell Row', 0, ['back'], 0, 2, 2);
    const WO21 = new Workout('Single Arm Rows', 0, ['back'], 0, 2, 2);
    const WO22 = new Workout('Inverted Row', 0, ['back'], 0, 2, 2);
    const WO23 = new Workout('Lat Pulldown', 0, ['back'], 0, 2, 2);
    const WO24 = new Workout('Leg Raises', 0, ['core'], 0, 2, 0);
    const WO25 = new Workout('Russian Twists', 0, ['core'], 0, 2, 0);
    const WO26 = new Workout('V-Sits', 0, ['core'], 0, 2, 0);
    const WO27 = new Workout('Penguins', 0, ['core'], 0, 2, 0);
    const WO28 = new Workout('Bicycle Kicks', 0, ['core'], 0, 2, 0);
    const WO29 = new Workout('Flutter Kicks', 0, ['core'], 0, 2, 0);
    const WO30 = new Workout('Knees to Elbows', 0, ['core'], 0, 2, 0);
    const WO31 = new Workout('Leg Extensions', 0, ['legs'], 0, 2, 2);
    const WO32 = new Workout('Hamstring Curls', 0, ['legs'], 0, 2, 2);
    const WO33 = new Workout('Calf Raises', 0, ['legs'], 0, 2, 0);
    const WO34 = new Workout('Lying Side Leg Raises', 0, ['legs'], 0, 2, 0);
    const WO35 = new Workout('Glute Bridges', 0, ['legs'], 0, 2, 0);
    const WO36 = new Workout('Duck Walk', 0, ['legs'], 0, 2, 0);
    const WO37 = new Workout('Crab Walk', 0, ['legs'], 0, 2, 0);
    const WO38 = new Workout('Lunges', 0, ['legs'], 0, 2, 0);
    const WO39 = new Workout('Captains of Crush', 0, ['grip'], 0, 2, 1);
    const WO40 = new Workout('Fat Grips', 0, ['grip'], 0, 2, 1);
    const WO41 = new Workout('Dumbbell Holds', 0, ['grip'], 0, 2, 1);
    const WO42 = new Workout('Plate Holds', 0, ['grip'], 0, 2, 1);

    //db - compound
    const WO43 = new Workout('Pull Ups', 1, ['back', 'arms'], 0, 2, 1);
    const WO44 = new Workout('Push Ups', 1, ['chest', 'back'], 0, 2, 0);
    const WO45 = new Workout('Squats', 1, ['legs', 'core'], 0, 2, 0);
    const WO46 = new Workout('Deadlift', 1, ['back', 'legs'], 0, 0, 2);
    const WO47 = new Workout('Bench Press', 1, ['chest', 'arms'], 0, 0, 2);
    const WO48 = new Workout('Hip Thrusts', 1, ['legs'], 0, 0, 1);
    const WO49 = new Workout('Clean and Jerk', 1, ['full body'], 0, 0, 3);
    const WO50 = new Workout('Dips', 1, ['arms', 'chest', 'shoulder'], 0, 2, 1);
    const WO51 = new Workout('Planks', 1, ['core', 'shoulder'], 1, 2, 0);
    const WO52 = new Workout('Wall Sits', 1, ['legs', 'core'], 1, 2, 0);
    const WO53 = new Workout('Jump Rope', 1, ['full body'], 1, 2, 1);
    const WO54 = new Workout('Burpees', 1, ['full body'], 0, 2, 0);
    const WO55 = new Workout('Handstands', 1, ['back', 'arms', 'core'], 1, 1, 0);
    const WO56 = new Workout('Commando Crawl', 1, ['full body'], 1, 1, 0);
    const WO57 = new Workout('Bear Crawl', 1, ['full body'], 1, 1, 0);
    const WO58 = new Workout('Spiderman Crawl', 1, ['full body'], 1, 1, 0);
    const WO59 = new Workout('Mountain Climbers', 1, ['full body'], 1, 2, 0);
    const WO60 = new Workout('Supermans', 1, ['back'], 1, 2, 0);
    const WO61 = new Workout('Reachers', 1, ['back'], 1, 2, 0);
    const WO62 = new Workout('Towel Pulls', 1, ['back'], 1, 2, 0);
    
    let arrWO = [];

    //push all numbered workout instances into array, update i <= number when adding new entries
    for (i = 1; i <= 62; i++) {
        arrWO.push(eval(`WO${i}`));
    }

//returns

    return {
        allWorkouts: function() {
            return arrWO;
        }
    }

})();

//console.log(dataBase.allWorkouts());

const algorithm = (function() {

    let arrInput = dataBase.allWorkouts(); //all workout instances in array

    const userProfile = { //obj containing answers and values that will be used to reduce arrInput
        age: undefined,
        bmi: undefined,
        fitness: undefined,
        experience: undefined,
        preference: undefined,
        gear: undefined,
        goals: undefined,

        fitCalc: function() {
            if (this.bmi < 25) {
                this.fitness = 1;
            } else if (this.bmi >= 25 && this.bmi < 30) {
                this.fitness = 2;
            } else {
                this.fitness = 3;
            }
        }
    }

    const inputUI = {
        q0: { //age
            a0: document.getElementById('q0-a0'), //under 20
            a1: document.getElementById('q0-a1'), //20-30
            a2: document.getElementById('q0-a2'), //30-40
            a3: document.getElementById('q0-a3'), //40-50
            a4: document.getElementById('q0-a4'), //50-60
            a5: document.getElementById('q0-a5') //60+
        },
        q1: document.getElementById('btn-q1'), //height/weight, next, get input data from surveyUI
        q2: { //experience
            a0: document.getElementById('q2-a0'), //2 or less
            a1: document.getElementById('q2-a1'), //3-4 years
            a2: document.getElementById('q2-a2') //5+ years
        },
        q3: { //obvious
            a0: document.getElementById('q3-a0'), //indoors
            a1: document.getElementById('q3-a1') //outdoors
        },
        q4: { //available equipment
            a0: document.getElementById('q4-a0'), //full gym
            a1: document.getElementById('q4-a1'), //partial gym
            a2: document.getElementById('q4-a2'), //some gear
            a3: document.getElementById('q4-a3') //no gear
        },
        q5: { //fitness goals
            a0: document.getElementById('q5-a0'), //general fitness
            a1: document.getElementById('q5-a1'), //conditioning
            a2: document.getElementById('q5-a2') //sport
        }

    }

    //handling obj prop for q0
    document.addEventListener('click', function(event) {
        switch(event.target) {
            case inputUI.q0.a0:
                userProfile.age = 1;
                console.log(userProfile);
                break;
            case inputUI.q0.a1:
                userProfile.age = 1;
                console.log(userProfile);
                break;
            case inputUI.q0.a2:
                userProfile.age = 2;
                console.log(userProfile);
                break;
            case inputUI.q0.a3:
                userProfile.age = 2;
                console.log(userProfile);
                break;
            case inputUI.q0.a4:
                userProfile.age = 3;
                console.log(userProfile);
                break;
            case inputUI.q0.a5:
                userProfile.age = 3;
                console.log(userProfile);
                break; 
        }
    });

    //handling obj prop for q1
    inputUI.q1.addEventListener('click', function() {
        if (front.surveyEL().surveyUI.measureImperial.classList.contains('active')) {
            let height = (front.surveyEL().surveyUI.inputFt.value * 12) + (front.surveyEL().surveyUI.inputIn.value * 1);
            let weight = (front.surveyEL().surveyUI.inputLb.value * 1);

            userProfile.bmi = parseFloat(((weight / (height * height)) * 703).toFixed(2));
            userProfile.fitCalc();

            console.log(userProfile);

        } else if (front.surveyEL().surveyUI.measureMetric.classList.contains('active')) {
            let height = (front.surveyEL().surveyUI.inputCm.value * 1);
            let weight = (front.surveyEL().surveyUI.inputKg.value * 1);

            userProfile.bmi = parseFloat(((weight / height / height) * 10000).toFixed(2));
            userProfile.fitCalc();

            console.log(userProfile);

        }
    });

    //handling obj prop for q2
    document.addEventListener('click', function(event) {
        switch(event.target) {
            case inputUI.q2.a0:
                userProfile.experience = 3;
                console.log(userProfile);
                break;
            case inputUI.q2.a1:
                userProfile.experience = 2;
                console.log(userProfile);
                break;
            case inputUI.q2.a2:
                userProfile.experience = 1;
                console.log(userProfile);
                break; 
        }
    });

    //handling obj prop for q3
    document.addEventListener('click', function(event) {
        switch(event.target) {
            case inputUI.q3.a0:
                userProfile.preference = 'indoors';
                console.log(userProfile);
                break;
            case inputUI.q3.a1:
                userProfile.preference = 'outdoors';
                console.log(userProfile);
                break;
        }
    });

    //handling obj prop for q4
    document.addEventListener('click', function(event) {
        switch(event.target) { //0,1,2,3 will match up with the tags for the workouts. 0 = no gear, 3 = full gym
            case inputUI.q4.a0:
                userProfile.gear = 3;
                console.log(userProfile);
                break;
            case inputUI.q4.a1:
                userProfile.gear = 2;
                console.log(userProfile);
                break;
            case inputUI.q4.a2:
                userProfile.gear = 1;
                console.log(userProfile);
                break;
            case inputUI.q4.a3:
                userProfile.gear = 0;
                console.log(userProfile);
                break;
        }
    });

    //handling obj prop for q5
    document.addEventListener('click', function(event) {
        switch(event.target) {
            case inputUI.q5.a0:
                userProfile.goals = 'general fitness';
                console.log(userProfile);
                break;
            case inputUI.q5.a1:
                userProfile.goals = 'conditioning';
                console.log(userProfile);
                break;
            case inputUI.q5.a2:
                userProfile.goals = 'sports';
                console.log(userProfile);
                break;
        }
    });

})();