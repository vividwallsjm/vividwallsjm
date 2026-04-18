export interface BotResponse {
  response: string;
  quickReplies: string[];
}

// CUSTOMIZATION POINT: Edit the responses below to change bot answers.
// Each key is a comma-separated list of keywords. If the user's message
// contains any of those words, the matching response is returned.
export const chatResponses: Record<string, BotResponse> = {
  'price,cost,how much,expensive,cheap,rate,fee': {
    response:
      'Our pricing starts at approximately JMD $2,500 per square metre for standard UV printing. The final quote depends on wall size, design complexity, and whether you add our 3D embossed texture option. Use the interactive pricing simulator on our website for an instant estimate, or upload a photo of your wall for a custom quote!',
    quickReplies: ['How does the 3D texture work?', 'How long does it take?', 'Get a custom quote'],
  },

  'time,turnaround,long,duration,how fast,quick,days,week': {
    response:
      'Most residential projects are completed in 1–2 days. Larger commercial or hotel projects typically take 3–5 days including surface preparation. We work efficiently to minimise disruption to your home or business. Rush service is available for an additional fee!',
    quickReplies: ['What about surface preparation?', 'Do you serve all of Jamaica?', 'How much does it cost?'],
  },

  '3d,texture,emboss,raised,tactile,dimensional,depth': {
    response:
      'Our 3D UV embossed option adds a physically raised texture to your mural — you can actually feel the depth! It creates the illusion of stone, wood grain, fabric, or any custom texture. The 3D effect is achieved by printing multiple layers of UV-curable ink that builds up height. It adds approximately 25% to the base print cost and is perfect for feature walls, reception areas, and hospitality spaces.',
    quickReplies: ['How much does 3D add to the cost?', 'What surfaces can you print on?', 'See the gallery'],
  },

  'jamaica,deliver,island,location,where,area,parish,kingston,montego,ocho,mandeville,portmore': {
    response:
      'We serve all 14 parishes across Jamaica! Our main base is in Kingston, and we regularly travel to Montego Bay, Ocho Rios, Negril, Mandeville, Portmore, Spanish Town, and everywhere in between. Travel fees may apply for remote locations. We\'ve printed over 150 projects island-wide!',
    quickReplies: ['How much does it cost?', 'How long does it take?', 'Book a consultation'],
  },

  'surface,wall,prepare,prep,concrete,plaster,drywall,wood,glass,brick,material': {
    response:
      'We can print directly on almost any smooth surface: painted plaster, drywall, concrete block (sealed), wood panels, glass, MDF, and ceramic tiles. Our team handles all surface preparation — cleaning, priming, and sealing as needed — before printing. Rough or very porous surfaces may need additional prep work.',
    quickReplies: ['Can you print on exterior walls?', 'What about 3D texture?', 'Get a quote'],
  },

  'book,appointment,consultation,start,begin,schedule,visit,survey': {
    response:
      'Starting is easy! You can: \n① Use our online Quote Tool and upload a photo of your wall \n② Call us at 876-555-0192 \n③ WhatsApp us at +1 (876) 555-0192 \n\nWe\'ll arrange a free on-site consultation within 48 hours, provide a detailed mockup, and confirm pricing before any work begins.',
    quickReplies: ['How much does it cost?', 'How long does it take?', 'What surfaces work?'],
  },

  'outdoor,exterior,outside,weather,humid,rain,sun,fade,durable': {
    response:
      'Yes! Our UV inks are specifically formulated to be weather-resistant and humidity-proof — perfect for Jamaica\'s tropical climate. Exterior prints are sealed with an additional UV-protective clear coat that resists fading, rain, and sea salt air. We\'ve had exterior installations looking vibrant after 5+ years!',
    quickReplies: ['How much does exterior printing cost?', 'What surfaces work?', 'Book a consultation'],
  },

  'hello,hi,hey,help,support,start,good morning,good afternoon': {
    response:
      'Welcome to Vivid Walls! 🎨 We\'re Jamaica\'s premier Direct UV Wall Printing studio, creating stunning murals and 3D feature walls across the island. What can I help you with today?',
    quickReplies: ['How much does it cost?', 'How long does it take?', 'What surfaces can you print on?'],
  },
};

export const defaultResponse: BotResponse = {
  response:
    'Great question! Our team is ready to help. For specific project enquiries, call us at 876-555-0192, WhatsApp +1 (876) 555-0192, or use the Quote Tool above to upload a photo of your wall. We\'ll get back to you within 24 hours!',
  quickReplies: ['How much does it cost?', 'How long does it take?', 'Book a consultation'],
};

export const greetingMessage: BotResponse = {
  response:
    'Hello! 👋 Welcome to Vivid Walls — Jamaica\'s leading Direct UV Wall Printing studio. How can I help you today?',
  quickReplies: ['How much does it cost?', 'How long does it take?', 'What surfaces can you print on?'],
};

export function getBotResponse(userInput: string): BotResponse {
  const input = userInput.toLowerCase();

  for (const [keywordsStr, resp] of Object.entries(chatResponses)) {
    const keywords = keywordsStr.split(',');
    if (keywords.some(kw => input.includes(kw.trim()))) {
      return resp;
    }
  }

  return defaultResponse;
}
