const userPenalties = []
const questions = [
//General Questions
{
"question" : "Did your issue happen inside the cyber world?",
options: [
{ text: "Yes", nextIndex: 1},
{ text: "No", result: "out_of_scope"}
]
},
{
"question" : "Are you a citizen of the Philippines?",
options: [
{ text: "Yes", nextIndex: 2}, //Proceed to Jurisdiction
{ text: "No", nextIndex: 3}
]
},
{
"question" : "Was the victim in the Philippines when the offense happened?",
options: [
{ text: "Yes", nextIndex: 2}, //Proceed to Jurisdiction
{ text: "No", result: "no_infringement"}
]
},
{
"question" : "What do you think was the committed offense?",
options: [
{ text: "Offenses against the confidentiality, integrity and availability of computer data and systems", nextIndex: 4}, //Proceed to Offenses against the confidentiality, integrity, and avalability
{ text: "Computer-related Offenses", nextIndex: 5}, //Proceed to Computer-related Offenses
{ text: "Content-related Offenses", nextIndex: 6} //Proceed to Content-related Offenses
]
},

//Offenses against the confidentiality, integrity and availability of computer data and systems:
{
"question" : "What area of Offense is it?",
options: [
{ text: "Yes", nextIndex: 2}, //Proceed to Jurisdiction
{ text: "No", result: "no_infringement"}
]
},
]

//Penalties
const penalties = {
"Illegal_Access":{
fine: 200000,
jailTime: 6,
},
"Illegal_Interception":{
fine: 200000,
jailTime: 6
},
"Data_Interference":{
fine: 200000,
jailTime: 6
},
"System_Interference":{
fine: 200000,
jailTime: 6
},
"Illegal_Interception":{
fine: 200000,
jailTime: 6
},
"Misuse_of_Devices":{
fine: 200000,
jailTime: 6
},
"Cyber_squatting":{
fine: 200000,
jailTime: 6
},
"Computer_related_Forgery":{
fine: 200000,
jailTime: 6
},
"Computer_related_Fraud":{
fine: 200000,
jailTime: 6
},
"Computer_related_Identity_Theft":{
fine: 200000,
jailTime: 6
},
"Cybersex":{
fine: 200000,
jailTime: 6
},
"Child_Pornography":{
fine: 200000,
jailTime: 6
},
"Unsolicited_Commercial_Communications":{
fine: 200000,
jailTime: 6
},
"Libel":{
fine: 200000,
jailTime: 6
},
}


let currentQuestionIndex = 0;

const questionElement = document.getElementById("question");
const questionContainer = document.getElementById("questionContainer");
const optionElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const penaltyDetailsElement = document.getElementById("penaltyDetails");
const restartButton = document.getElementById("result");

function displayQuestion(){
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.Question;

    //remove previous option
    optionElement.innerHTML = "";

    //insert new options
    currentQuestion.Options.forEach(option =>
        {
            const button = document.createElement("button");
            button.innerText = option.Text;
            button.onclick = () =>{
                //if option has nextIndex rather than result
                if(option.nextIndex !== undefined){
                    currentQuestionIndex = option.nextIndex;
                    displayQuestion();
            }else if (option.result){
                displayResult(option.result);
            }
        };
        optionElement.appendChild(button);
    });
}

function displayResult(resultType){
    questionElement.classList.add("hidden");
    optionElement.classList.add("hidden");
    questionContainer.classList.add("hidden");
    resultElement.classList.remove("hidden");
    restartButton.classList.remove("hidden");

    const penalty = penalties[resultType];
    penaltyDetailsElement.innerHTML = `<p>${penalty.label}</p>`;
    
}
