import {
  GSK_HISTORY_ELEMENT,
  GSK_HISTORY_INPUT_ELEMENT,
} from "../services/library/types/ai-data-model.js";
import { GSK_FULL_EVENT_DATA } from "../services/library/types/participants.js";

const event: GSK_FULL_EVENT_DATA = {
  event: {
    background: "",
    name: "Synergy in Sustainability: Implementing Smart Logic in Bio-Energy Systems",
    description:
      'This professional development session focuses on the practical application of "Smart" Bioelectrochemical Systems (BES). The goal is to explore how biological wastewater treatment processes can be enhanced using digital monitoring and automation.\nRather than focusing on the complex molecular reactions, this session prioritizes the system architecture. The student will learn how to couple a biological reactor (where microbes consume waste to generate power) with a digital control unit. The core learning objective is understanding how to translate biological signals—such as the health and activity of the bacteria—into digital data that can be monitored and optimized by a computer in real-time.',
    dynamics:
      'The session is designed as a hands-on systems integration workshop.\nPhase 1: Conceptual Framework (20 mins): A high-level overview of how specific bacteria function as "living batteries." The discussion focuses on the flow of energy from organic waste to the electrode surfaces without diving into stoichiometry.\nPhase 2: Sensor Integration (40 mins): The participants will install environmental sensors into the reactor. They will focus on monitoring critical health indicators—such as temperature and acidity levels—that determine if the microbes are happy and productive.\nPhase 3: The "Smart" Interface (40 mins): The student will connect the reactor to a dashboard on a tablet or computer. They will configure the software to trigger automatic alerts if the system efficiency drops, simulating a "self-healing" smart grid.\nPhase 4: Strategic Application (20 mins): A concluding discussion on how these systems can be scaled up for use in smart cities or industrial water treatment plants.',
    language: "en-US",
  },
  participants: [
    {
      type: "human",
      avatarIdle: "",
      avatarListening: "",
      avatarThinking: "",
      avatarTalking: "",
      name: "Dr. Aris Thorne",
      bio: "Dr. Thorne is a leading consultant in Green Technology Integration. With over 15 years of experience in sustainable design, he specializes in making complex bio-energy systems accessible for municipal utility operators. He has advised cities on integrating renewable energy into existing infrastructure and is known for his ability to explain dense engineering concepts through clear, functional analogies.",
      role: "Systems Architect & Mentor",
    },
    {
      type: "human",
      avatarIdle: "",
      avatarListening: "",
      avatarThinking: "",
      avatarTalking: "",
      name: "Julian Varela",
      bio: 'Julian is an aspiring Environmental Systems Technologist currently completing a graduate certificate in Urban Informatics. While he is skilled in software data visualization and hardware assembly, he is new to the "bio" side of energy. Julian is attending this session to master the hands-on skills required to monitor and maintain automated biological reactors in smart-city environments.',
      role: "Junior Environmental Technologist",
    },
  ],
  roles: [
    {
      name: "Systems Architect & Mentor",
      description:
        "The expert facilitator who bridges the gap between biological science and engineering. Their responsibility is to ensure the student understands the logic of the system—how the biological component interacts with the digital component—rather than the granular chemical calculations. They guide the strategic design choices.",
    },
    {
      name: "Junior Environmental Technologist",
      description:
        "The learner responsible for the assembly and operation of the prototype. This role involves connecting hardware, configuring software settings, and observing how physical changes to the reactor (like adding more fuel) result in immediate changes on the digital dashboard.",
    },
  ],
};
const fullTranscript: GSK_HISTORY_ELEMENT[] = [];

export const resetTheFullEventData = (newEvent: GSK_FULL_EVENT_DATA) => {
  setFullEventData(newEvent);
  clearFullTranscript();
};

export const contiueEventWithHistory = (newEvent: GSK_FULL_EVENT_DATA) => {
  setFullEventData(newEvent);
};

const setFullEventData = (newEvent: GSK_FULL_EVENT_DATA) => {
  event.event = newEvent.event;
  event.participants = newEvent.participants;
  event.roles = newEvent.roles;
};
export const getFullEventData = () => {
  return event;
};

export const appendToFullTranscript = (
  newElement: GSK_HISTORY_INPUT_ELEMENT
) => {
  const fullElement: GSK_HISTORY_ELEMENT = {
    name: event.participants?.[newElement.participantIdx]?.name || "Unknown",
    role: event.participants?.[newElement.participantIdx]?.role || "Unknown",
    content: newElement.content,
  };
  fullTranscript.push(fullElement);
  //console.log("Full Transcript:", fullTranscript);
  console.log("Full Transcript Length:", fullTranscript.length);
};
export const getFullTranscript = () => {
  return fullTranscript;
};
const clearFullTranscript = () => {
  fullTranscript.length = 0;
};

export const setFullTranscript = (newTranscript: GSK_HISTORY_ELEMENT[]) => {
  fullTranscript.length = 0; // Clear the existing transcript
  fullTranscript.push(...newTranscript); // Add the new transcript elements
  //console.log("Full Transcript Set:", fullTranscript);
  console.log("Full Transcript Length Set:", fullTranscript.length);
};

export const getPromptForAI = () => {
  return `
  # Event Details
  - **Event Name**: ${event.event.name}
  - **Event Description**: ${event.event.description}
  - **Event Dynamics**: ${event.event.dynamics}
  - **Event Language**: ${event.event.language}
  # Roles
  ${event.roles
    .map(
      (role) =>
        `- **Role Name**: ${role.name}\n  - **Description**: ${role.description}`
    )
    .join("\n")}
  # Participants
  ${event.participants
    .map(
      (participant) =>
        `- **Name**: ${participant.name}\n  - **Role**: ${participant.role}\n  - **Bio**: ${participant.bio}`
    )
    .join("\n")}
  # Transcript
  ${fullTranscript
    .map(
      (element) =>
        `- **Name**: ${element.name}\n  - **Role**: ${element.role}\n  - **Content**: ${element.content}`
    )
    .join("\n")}
    `;
};

export const getSystemPrompt = (idx: number) => {
  const participant = event.participants[idx];
  return `
  You are ${participant.name}, a ${participant.role} in the event "${event.event.name}".
  It is your turn to speak.
  Your bio is
  \`\`\`
  ${participant.bio}
  \`\`\`
  You are expected to respond in the language "${event.event.language}".
  You are expected to respond in the same tone and style as the previous speakers.
  You are expected to respond in the same context as the previous speakers.
  You are expected to respond in the same context as the event dynamics.
  Your response should be just the content of the message, without any additional information.
  Your response should be without markdown formatting because it will be read aloud using simple TTS.
  `;
};

/**
 * This function generates a human-readable report of the event, participants, roles, and transcript.
 * It should be in markdown format.
 * It should be used to record the event in a human-readable format.
 * It should be used to generate a report of the event.
 */
export const getHumanReadableReport = () => {
  return `
# Event Report: ${event.event.name}
## Event Details
- **Description**: ${event.event.description}
- **Dynamics**: ${event.event.dynamics}
- **Language**: ${event.event.language}
## Roles
${event.roles
  .map(
    (role) =>
      `- **Role Name**: ${role.name}\n  - **Description**: ${role.description}`
  )
  .join("\n")}
## Participants
${event.participants
  .map(
    (participant) =>
      `- **Name**: ${participant.name}\n  - **Role**: ${participant.role}\n  - **Bio**: ${participant.bio}`
  )
  .join("\n")}
## Transcript
${fullTranscript
  .map(
    (element) =>
      `- **Name**: ${element.name}\n  - **Role**: ${element.role}\n  - **Content**: ${element.content}`
  )
  .join("\n")}
  `;
};
