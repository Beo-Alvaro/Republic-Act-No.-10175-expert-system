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
{ text: "Yes", nextIndex: 2}, 
{ text: "No", nextIndex: 2}
]
},
{
"question" : "Was the victim in the Philippines when the offense happened?",
options: [
{ text: "Yes", nextIndex: 3}, 
{ text: "No", result: "no_infringement"}
]
},
{
"question" : "What was the person's involvement in the offense?",
options: [
{ text: "Direct perpetrator", nextIndex: 4, facts: ["direct_perpetrator"]},
{ text: "Aided or abetted commission", facts: ["aiding_abetting"], nextIndex: 4},
{ text: "Attempted to commit offense", facts: ["attempt"], nextIndex: 4}
]
},
{
"question" : "What do you think was the committed offense?",
options: [
{ text: "Offenses against confidentiality, integrity and availability of data/systems", nextIndex: 5}, 
{ text: "Computer-related Offenses", nextIndex: 6}, 
{ text: "Content-related Offenses", nextIndex: 7} 
]
},

//Offenses against the confidentiality, integrity and availability of computer data and systems:
{
"question" : "What specific offense was committed?",
options: [
{ text: "Illegal Access", result: "Illegal_Access", facts: ["cia_offense", "illegal_access"]},
{ text: "Illegal Interception", result: "Illegal_Interception", facts: ["cia_offense", "illegal_interception"]},
{ text: "Data Interference", result: "Data_Interference", facts: ["cia_offense", "data_interference"]},
{ text: "System Interference", result: "System_Interference", facts: ["cia_offense", "system_interference"]},
{ text: "Misuse of Devices", nextIndex: 8, facts: ["cia_offense", "misuse_devices"]}
]
},

//Computer-related Offenses
{
"question" : "What type of Computer-related Offense was committed?",
options: [
{ text: "Computer-related Forgery", result: "Computer_related_Forgery", facts: ["computer_related", "forgery"]},
{ text: "Computer-related Fraud", result: "Computer_related_Fraud", facts: ["computer_related", "fraud"]},
{ text: "Computer-related Identity Theft", result: "Computer_related_Identity_Theft", facts: ["computer_related", "identity_theft"]},
{ text: "Cyber-squatting", result: "Cyber_squatting", facts: ["computer_related", "cybersquatting"]}
]
},

//Content-related Offenses
{
"question" : "What type of Content-related Offense was committed?",
options: [
{ text: "Cybersex", result: "Cybersex", facts: ["content_related", "cybersex"]},
{ text: "Child Pornography", result: "Child_Pornography", facts: ["content_related", "child_pornography"]},
{ text: "Unsolicited Commercial Communications", result: "Unsolicited_Commercial_Communications", facts: ["content_related", "unsolicited_comm"]},
{ text: "Cyber Libel", result: "Libel", facts: ["content_related", "libel"]}
]
},

// Additional question for misuse of devices
{
"question" : "Was the offense against critical infrastructure?",
options: [
{ text: "Yes", facts: ["critical_infrastructure"], specialResult: "critical_infra"},
{ text: "No", result: "Misuse_of_Devices"}
]
}
]

// User facts for forward chaining
let userFacts = [];

//Penalties as per RA 10175
const penalties = {
    // Section 4a and 4b offenses (general)
    "Illegal_Access": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Illegal Access",
        description: "The access to the whole or any part of a computer system without right.",
        baseSection: "4(a)(1)"
    },
    "Illegal_Interception": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Illegal Interception",
        description: "The interception made by technical means without right of any non-public transmission of computer data.",
        baseSection: "4(a)(2)"
    },
    "Data_Interference": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Data Interference",
        description: "The intentional or reckless alteration, damaging, deletion or deterioration of computer data, without right.",
        baseSection: "4(a)(3)"
    },
    "System_Interference": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "System Interference",
        description: "The intentional alteration or reckless hindering or interference with the functioning of a computer system.",
        baseSection: "4(a)(4)"
    },
    "Misuse_of_Devices": {
        fine: 500000,  // Special case with different maximum
        fineMax: "500,000",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Misuse of Devices",
        description: "The use, production, sale, procurement, importation, distribution of devices designed for cybercrimes.",
        baseSection: "4(a)(5)"
    },
    "Cyber_squatting": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Cyber-squatting",
        description: "The acquisition of a domain name over the internet in bad faith to profit, mislead, destroy reputation.",
        baseSection: "4(a)(6)"
    },
    "Computer_related_Forgery": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Computer-related Forgery",
        description: "The input, alteration, or deletion of any computer data without right resulting in inauthentic data.",
        baseSection: "4(b)(1)"
    },
    "Computer_related_Fraud": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Computer-related Fraud",
        description: "The unauthorized input, alteration, or deletion of computer data with fraudulent intent.",
        baseSection: "4(b)(2)"
    },
    "Computer_related_Identity_Theft": {
        fine: 200000, 
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Computer-related Identity Theft",
        description: "The intentional acquisition, use, misuse of identifying information belonging to another without right.",
        baseSection: "4(b)(3)"
    },
    // Section 4c special cases
    "Cybersex": {
        fine: 200000,
        fineMax: "1,000,000",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Cybersex",
        description: "The willful engagement, maintenance, control, or operation of any lascivious exhibition of sexual organs or activity.",
        baseSection: "4(c)(1)"
    },
    "Child_Pornography": {
        fine: 500000, // Higher penalties for child pornography (based on RA 9775 + one degree higher)
        fineMax: "1,500,000",
        jailTime: "Reclusion Temporal to Reclusion Perpetua",
        label: "Child Pornography",
        description: "Unlawful acts defined in RA 9775 committed through a computer system (one degree higher penalty).",
        baseSection: "4(c)(2)"
    },
    "Unsolicited_Commercial_Communications": {
        fine: 50000,
        fineMax: "250,000",
        jailTime: "Arresto Mayor (1m 1d to 6m)",
        label: "Unsolicited Commercial Communications",
        description: "The transmission of commercial electronic communication without prior consent or proper opt-out mechanisms.",
        baseSection: "4(c)(3)"
    },
    "Libel": {
        fine: 200000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Prision Mayor (6y 1d to 12y)",
        label: "Cyber Libel",
        description: "The unlawful or prohibited acts of libel as defined in Article 355 of the Revised Penal Code committed through ICT.",
        baseSection: "4(c)(4)"
    },
    // Special cases
    "critical_infra": {
        fine: 500000,
        fineMax: "Amount commensurate to damage",
        jailTime: "Reclusion Temporal (12y 1d to 20y)",
        label: "Offense Against Critical Infrastructure",
        description: "Higher penalty when offense is committed against critical infrastructure.",
        baseSection: "8"
    },
    "section5_violation": {
        fine: 100000,
        fineMax: "500,000",
        jailTime: "One degree lower than main offense",
        label: "Aiding/Abetting or Attempt",
        description: "Willfully aiding, abetting, or attempting to commit any cybercrime offense.",
        baseSection: "5",
        specialCase: true
    },
    "out_of_scope": {
        label: "Out of Scope",
        description: "This issue is outside the scope of the Cybercrime Prevention Act (RA 10175)."
    },
    "no_infringement": {
        label: "No Infringement Under Philippine Jurisdiction",
        description: "Based on the information, there may not be an infringement under Philippine jurisdiction."
    }
}

// Rules for forward chaining
const rules = [
    {
        condition: ["cia_offense", "critical_infrastructure"],
        conclusion: "critical_infra"
    },
    {
        condition: ["aiding_abetting"],  
        conclusion: "section5_violation"
    },
    {
        condition: ["attempt"],
        conclusion: "section5_violation"
    },
    {
        condition: ["direct_perpetrator", "cia_offense"],
        conclusion: "direct_cia_violation"
    },
    {
        condition: ["direct_perpetrator", "computer_related"],
        conclusion: "direct_computer_related_violation"
    },
    {
        condition: ["direct_perpetrator", "content_related"],
        conclusion: "direct_content_related_violation"
    }
];

let currentQuestionIndex = 0;
let baseOffense = null; // To track the main offense when handling Section 5 cases

const questionElement = document.getElementById("question");
const questionContainer = document.getElementById("questionContainer");
const optionElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const penaltyDetailsElement = document.getElementById("penaltyDetails");
const restartButton = document.getElementById("restart");

// Forward chaining engine
function evaluateRules() {
    let newFacts = [];
    
    // Check each rule
    for (const rule of rules) {
        // Check if all conditions in the rule are met
        const allConditionsMet = rule.condition.every(condition => 
            userFacts.includes(condition));
            
        if (allConditionsMet && !userFacts.includes(rule.conclusion)) {
            newFacts.push(rule.conclusion);
        }
    }
    
    // If we derived new facts, add them and check rules again
    if (newFacts.length > 0) {
        userFacts = [...userFacts, ...newFacts];
        return evaluateRules(); // Keep inferring until no new facts
    }
    
    return userFacts; // Return all facts including derived ones
}

// Function to find base offense
function findBaseOffense() {
    // Check each fact to find an offense
    for (const fact of userFacts) {
        if (penalties[fact] && !penalties[fact].specialCase) {
            // If this is a direct offense, not a special case
            return fact;
        }
    }
    return null;
}

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
            // Add facts if this option provides any
            if (option.facts) {
                userFacts = [...userFacts, ...option.facts];
                evaluateRules(); // Apply forward chaining
            }
            
            // Special processing result
            if (option.specialResult === "process_results") {
                // Find the base offense and process results
                baseOffense = findBaseOffense();
                if (baseOffense) {
                    displayResult(baseOffense);
                } else {
                    // No specific offense was found
                    displayResult("no_infringement");
                }
                return;
            }
            
            // Special case for handling critical infrastructure
            if (option.specialResult) {
                const inferredFacts = evaluateRules();
                // Display result based on inferred facts
                displayResult(option.specialResult);
                return;
            }
            
            // Continue with normal flow
            if(option.nextIndex !== undefined){
                currentQuestionIndex = option.nextIndex;
                displayQuestion();
            } else if (option.result){
                // Save base offense before potentially switching to a special case
                baseOffense = option.result;
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

    // Check if we need to override resultType based on inferred facts
    for (const fact of userFacts) {
        if (penalties[fact] && fact !== resultType) {
            // Critical infrastructure takes precedence
            if (fact === "critical_infra") {
                resultType = fact;
                break;
            }
        }
    }

    const penalty = penalties[resultType];
    
    if (penalty) {
        let resultHTML = `
            <div class="mb-6 border-b pb-4">
                <h3 class="text-xl font-bold text-blue-800 mb-2">${penalty.label}</h3>
                <p class="text-gray-700">${penalty.description || ""}</p>
            </div>
        `;
        
        if (penalty.jailTime || penalty.fine) {
            resultHTML += `
                <div class="bg-gray-100 p-4 rounded-md">
                    <h4 class="font-bold text-gray-800 mb-2">Penalties under RA 10175:</h4>
                    <ul class="list-disc pl-5">`;
            
            if (penalty.jailTime) {
                resultHTML += `<li class="mb-1"><span class="font-semibold">Imprisonment:</span> ${penalty.jailTime}</li>`;
            }
            
            if (penalty.fine) {
                resultHTML += `<li class="mb-1"><span class="font-semibold">Fine:</span> PHP ${penalty.fine.toLocaleString()} up to ${penalty.fineMax}</li>`;
            }
            
            if (penalty.baseSection) {
                resultHTML += `<li class="mt-2"><span class="font-semibold">Legal Basis:</span> Section ${penalty.baseSection} of RA 10175</li>`;
            }
            
            resultHTML += `</ul>`;
            
            // Indicate any special circumstances
            if (userFacts.includes("critical_infrastructure")) {
                resultHTML += `
                    <div class="mt-4 bg-yellow-100 p-3 rounded-md">
                        <p class="font-semibold text-yellow-800">Special case: Critical Infrastructure</p>
                        <p class="text-sm">Higher penalties apply when the offense is committed against critical infrastructure.</p>
                    </div>
                `;
            }
            
            // Handle Section 5 violations (aiding/abetting or attempt)
            if (userFacts.includes("section5_violation")) {
                resultHTML += `
                    <div class="mt-4 bg-blue-100 p-3 rounded-md">
                        <p class="font-semibold text-blue-800">Section 5 Offense: ${userFacts.includes("aiding_abetting") ? "Aiding/Abetting" : "Attempt"}</p>
                        <p class="text-sm">Per Section 5 of RA 10175, the penalty is one degree lower than the main offense, with a fine of PHP 100,000 to PHP 500,000.</p>
                        ${baseOffense ? `<p class="text-sm mt-1">Base offense: ${penalties[baseOffense].label}</p>` : ''}
                    </div>
                `;
            }
            
            resultHTML += `</div>`;
        }
        
        penaltyDetailsElement.innerHTML = resultHTML;
    } else {
        penaltyDetailsElement.innerHTML = "<p>No penalty information available for this offense.</p>";
    }
}

function restartSystem() {
    // Reset facts and state
    userFacts = [];
    baseOffense = null;
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hidden");
    questionElement.classList.remove("hidden");
    optionElement.classList.remove("hidden");
    resultElement.classList.add("hidden");
    restartButton.classList.add("hidden");
    displayQuestion();
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
});
