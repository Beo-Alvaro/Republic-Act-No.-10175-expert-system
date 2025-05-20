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
}

]

//Penalties
const penalties = {
"Illegal_Access":{
fine: 200000,
jailTime: 6,
label: "Illegal Access: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Illegal_Interception":{
fine: 200000,
jailTime: 6,
label: "Illegal Interception: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Data_Interference":{
fine: 200000,
jailTime: 6,
label: "Data Interference: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"System_Interference":{
fine: 200000,
jailTime: 6,
label: "System Interference: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Misuse_of_Devices":{
fine: 200000,
jailTime: 6,
label: "Misuse of Devices: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Cyber_squatting":{
fine: 200000,
jailTime: 6,
label: "Cyber-squatting: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Computer_related_Forgery":{
fine: 200000,
jailTime: 6,
label: "Computer-related Forgery: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Computer_related_Fraud":{
fine: 200000,
jailTime: 6,
label: "Computer-related Fraud: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Computer_related_Identity_Theft":{
fine: 200000,
jailTime: 6,
label: "Computer-related Identity Theft: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Cybersex":{
fine: 200000,
jailTime: 6,
label: "Cybersex: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Child_Pornography":{
fine: 200000,
jailTime: 6,
label: "Child Pornography: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Unsolicited_Commercial_Communications":{
fine: 200000,
jailTime: 6,
label: "Unsolicited Commercial Communications: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"Libel":{
fine: 200000,
jailTime: 6,
label: "Cyber Libel: Fine of PHP 200,000 and imprisonment of up to 6 years"
},
"out_of_scope":{
label: "This issue is outside the scope of the Cybercrime Prevention Act (RA 10175)."
},
"no_infringement":{
label: "Based on the information, there may not be an infringement under Philippine jurisdiction."
}
}


let currentQuestionIndex = 0;

const questionElement = document.getElementById("question");
const questionContainer = document.getElementById("questionContainer");
const optionElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const penaltyDetailsElement = document.getElementById("penaltyDetails");
const restartButton = document.getElementById("restart");

function displayQuestion(){
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    //remove previous option
    optionElement.innerHTML = "";

    //insert new options
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-medium", "py-2", "px-4", "rounded", "w-full", "mb-2");
        button.onclick = () => {
            //if option has nextIndex rather than result
            if(option.nextIndex !== undefined){
                currentQuestionIndex = option.nextIndex;
                displayQuestion();
            } else if (option.result){
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
