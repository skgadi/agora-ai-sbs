import {
  GSK_DATA_FOR_EVENT_GENERATION,
  GSK_FULL_EVENT_DATA,
} from "../services/library/types/participants.js";
import { getFullEventData } from "./full-history.js";
import { ai, getSelectedModel } from "./initialization.js";

import * as z from "zod";

const eventZod = z.object({
  name: z.string().describe("Name of the event. Should be catchy and concise"),
  description: z
    .string()
    .describe("Description of the event. Explain the purpose and goals"),
  dynamics: z
    .string()
    .describe("Dynamics of the event. How the event will unfold"),
});

const roleZod = z.object({
  name: z
    .string()
    .describe(
      "Name of the role. This should be concise and reflect the function of the role. E.g., Teacher, Student, Moderator etc."
    ),
  description: z
    .string()
    .describe(
      "Description of the role. Explain the responsibilities and expectations associated with this role."
    ),
});

const rolesZod = z
  .array(roleZod)
  .describe("Array of roles for the event participants");

const participantZod = z.object({
  name: z.string().describe("Name of the participant"),
  role: z
    .string()
    .describe(
      "Role of the participant in the event. This should exactly match with the one of the given roles."
    ),
  bio: z
    .string()
    .describe(
      "Short bio of the participant. This should reflect their expertise and background relevant to the event."
    ),
});

const participantsZod = z
  .array(participantZod)
  .describe("Array of participants for the event");

const generateBasicEvent = async (
  inData: GSK_DATA_FOR_EVENT_GENERATION
): Promise<GSK_FULL_EVENT_DATA["event"]> => {
  const systemInstruction = `You are an expert scientic event organizer.
  Based on the topics provided, generate event details with the following JSON format:${JSON.stringify(
    eventZod.toJSONSchema()
  )}. The content should be of language ${
    inData.language
  }. Provide only the JSON output without any additional text.`;

  const response = await ai().models.generateContent({
    model: getSelectedModel().modelId,
    contents: [
      {
        text: `Generate an event with objective of ${
          inData.activity
        } where a goup of ${
          inData.noOfAIParticipants + inData.noOfHumanParticipants
        } participants discuss the following topics: ${inData.topicsToDiscuss
          .map((t) => t.topic + ">" + t.subTopic + ">" + t.subSubTopic)
          .join("\n")}. In this group there are ${
          inData.noOfAIParticipants
        } expert participants who will contribute as knowledge sources.`,
      },
    ],
    config: {
      temperature: 0.7,
      systemInstruction,
    },
  });
  // remove ```json ... ``` if present
  const improvedText = response.text
    ? response.text.replace(/```json/g, "").replace(/```/g, "")
    : "";

  console.log("Generated Basic Event Text:", improvedText);
  const parseResult = eventZod.parse(JSON.parse(improvedText));
  const outEvent: GSK_FULL_EVENT_DATA["event"] = {
    name: parseResult.name,
    description: parseResult.description,
    dynamics: parseResult.dynamics,
    background: "",
    language: inData.language,
  };
  return outEvent;
};

const generateRolesForEvent = async (
  inData: GSK_DATA_FOR_EVENT_GENERATION
): Promise<GSK_FULL_EVENT_DATA["roles"]> => {
  const systemInstruction = `You are an expert scientific event organizer. Based on the topics provided, generate roles for the event participants with the following JSON format:${JSON.stringify(
    rolesZod.toJSONSchema()
  )}. The number of roles should be less than ${
    inData.noOfAIParticipants + inData.noOfHumanParticipants
  }. The content should be of language ${
    inData.language
  }. Provide only the JSON output without any additional text.`;

  const response = await ai().models.generateContent({
    model: getSelectedModel().modelId,
    contents: [
      {
        text: `Generate roles for an event with objective of ${
          inData.activity
        } where a goup of ${
          inData.noOfAIParticipants + inData.noOfHumanParticipants
        } participants discuss the following topics: ${inData.topicsToDiscuss
          .map((t) => t.topic + ">" + t.subTopic + ">" + t.subSubTopic)
          .join("\n")}. In this group there are ${
          inData.noOfAIParticipants
        } expert participants who will contribute as knowledge sources.`,
      },
    ],
    config: {
      temperature: 0.7,
      systemInstruction,
    },
  });
  // remove ```json ... ``` if present
  const improvedText = response.text
    ? response.text.replace(/```json/g, "").replace(/```/g, "")
    : "";
  const parseResult = rolesZod.parse(JSON.parse(improvedText));
  return parseResult;
};

const generateParticipantsForEvent = async (
  inData: GSK_DATA_FOR_EVENT_GENERATION,
  roles: GSK_FULL_EVENT_DATA["roles"]
): Promise<GSK_FULL_EVENT_DATA["participants"]> => {
  const systemInstruction = `You are an expert scientific event organizer. Based on the topics provided, generate participants for the event with the following JSON format:${JSON.stringify(
    participantsZod.toJSONSchema()
  )}. Ensure that each participant is assigned a role from the provided roles list. The content should be of language ${
    inData.language
  }. Provide only the JSON output without any additional text.`;

  const response = await ai().models.generateContent({
    model: getSelectedModel().modelId,
    contents: [
      {
        text: `Generate participants for an event with objective of ${
          inData.activity
        } where a goup of ${
          inData.noOfAIParticipants + inData.noOfHumanParticipants
        } participants discuss the following topics: ${inData.topicsToDiscuss
          .map((t) => t.topic + ">" + t.subTopic + ">" + t.subSubTopic)
          .join("\n")}. In this group there are ${
          inData.noOfAIParticipants
        }. The roles of the participants and their descriptions are as follows: ${roles
          .map(
            (role) =>
              `- Role Name: ${role.name}\n  - Description: ${role.description}`
          )
          .join("\n")}
          
          A total of ${
            inData.noOfAIParticipants + inData.noOfHumanParticipants
          } participants are needed. Among them, the expert participants should be assigned roles that reflect their expertise. The number of expert participants is ${
          inData.noOfAIParticipants
        }. And the rest are human participants.
          `,
      },
    ],
    config: {
      temperature: 0.7,
      systemInstruction,
    },
  });
  // remove ```json ... ``` if present
  const improvedText = response.text
    ? response.text.replace(/```json/g, "").replace(/```/g, "")
    : "";
  if (!improvedText) {
    throw new Error("No response from AI");
  }
  const parseResult = participantsZod.parse(JSON.parse(improvedText));
  const outParticipants: GSK_FULL_EVENT_DATA["participants"] = parseResult.map(
    (participant, idx) => ({
      name: participant.name,
      role: participant.role,
      bio: participant.bio,
      avatarIdle: "",
      avatarTalking: "",
      avatarListening: "",
      avatarThinking: "",
      type: "human",
    })
  );
  return outParticipants;
};

export const generateEventDetails = async (
  inData: GSK_DATA_FOR_EVENT_GENERATION
): Promise<GSK_FULL_EVENT_DATA> => {
  const outEvent: GSK_FULL_EVENT_DATA = getFullEventData();
  try {
    if (inData.topicsToDiscuss.length === 0) {
      inData.topicsToDiscuss.push({
        topic: "bioelectrochemical",
        subTopic: "bioelectrochemical systems",
        subSubTopic: "Smart bioelectrochemical systems",
      });
    }
    const event = await generateBasicEvent(inData);
    outEvent.event = event;
    const roles = await generateRolesForEvent(inData);
    outEvent.roles = roles;
    const participants = await generateParticipantsForEvent(inData, roles);
    outEvent.participants = participants;
  } catch (error) {
    console.error("Error in generateEventDetails:", error);
  }

  return outEvent;
};
