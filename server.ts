import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// ==========================================
// 1. CRM & VIP CLIENT RETENTION AGENT API
// ==========================================
app.post('/api/agents/crm-action', async (req, res) => {
  try {
    const { clientName, lastStyle, weeksSinceVisit, hairNeeds, vipStatus, customGoal } = req.body;

    if (!ai) {
      // High-quality fallback if API key is not yet set
      return res.json({
        success: true,
        data: {
          analysis: `${clientName} is ${weeksSinceVisit} weeks post-${lastStyle}. Braid takedown is recommended within 6-8 weeks to preserve hair follicles and hairline edges.`,
          recommendedStyle: lastStyle.includes('Knotless') ? 'Scalp Detox & Medium Knotless Braids' : 'Boho Goddess Knotless Braids',
          retentionProbability: '92%',
          incentiveCode: 'CROWNCARE15',
          discount: '15% Off Next Service or $10 Off Scalp Treatment',
          smsMessage: `Hi ${clientName}! ✨ Princess AHB checking in on your crown. Your ${lastStyle} is at ${weeksSinceVisit} weeks. To preserve your edges and lock in moisture, let's refresh your look! Book your takedown & fresh style this week with code CROWNCARE15 for 15% off: https://princessahb.com/book`,
          whatsappMessage: `Greetings Queen ${clientName}! 👑 Princess AHB here. We hope your ${lastStyle} treated you wonderfully. At week ${weeksSinceVisit}, your natural hair is ready for a deep hydration cleanse and fresh protective styling. We have VIP chairs open this Thursday & Saturday. Claim your complimentary tension-free scalp massage + 15% off with VIP code CROWNCARE15!`,
          emailSubject: `Time to refresh your crown, ${clientName} (Exclusive 15% VIP inside)`,
          emailBody: `Dear ${clientName},\n\nAt Princess African Hair Braiding, honoring your natural crown and preserving your hairline integrity is our sacred art.\n\nIt has been ${weeksSinceVisit} weeks since your ${lastStyle}. Protective styles thrive best when removed between 6-8 weeks to prevent matting and support length retention.\n\nWe would love to welcome you back for our Signature Herbal Scalp Detox followed by your next protective set. Use your personal VIP code CROWNCARE15 at checkout to receive 15% off.\n\nWith love and reverence,\nThe Princess AHB Artistry Team`,
        },
      });
    }

    const prompt = `You are CrownKeeper AI, the autonomous CRM and VIP Client Retention Agent for "Princess African Hair Braiding & Collective" (Princess AHB) - a luxury African hair braiding salon and braiders collective.
Client Profile:
- Name: ${clientName || 'Valued Client'}
- Last protective style: ${lastStyle || 'Bohemian Knotless Braids'}
- Weeks since last appointment: ${weeksSinceVisit || '7'} weeks
- Scalp & hair notes: ${hairNeeds || 'Prefers light tension, dry scalp prone'}
- VIP status: ${vipStatus || 'Gold VIP'}
- Goal: ${customGoal || 'Trigger a high-converting re-booking and recommend our digital crown care guide'}

Analyze the client's hair cycle, calculate retention urgency, and generate personalized, warm, luxury communication.
Respond strictly with a JSON object in this structure:
{
  "analysis": "2-3 sentences on follicular health, edge protection timing, and why re-booking now is crucial",
  "recommendedStyle": "Best complementary next style",
  "retentionProbability": "e.g. 88%",
  "incentiveCode": "e.g. CROWNRETENTION15",
  "discount": "e.g. 15% VIP discount or complimentary herbal tea & scalp steam",
  "smsMessage": "Short high-converting SMS with greeting, reminder, promo code, and link",
  "whatsappMessage": "Polished, warm WhatsApp message with crown emojis",
  "emailSubject": "Compelling subject line",
  "emailBody": "Elegant editorial email text"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/agents/crm-action:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 2. AUTONOMOUS DIGITAL PRODUCT CREATOR API
// ==========================================
app.post('/api/agents/create-digital-product', async (req, res) => {
  try {
    const { topic, targetAudience, format, priceTier, customBrief } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        data: {
          title: `The Ultimate ${topic || 'Boho Braid Longevity'} Masterguide`,
          subtitle: 'Proven techniques for zero-tension parting, edge restoration, and lasting shine',
          category: format || 'E-Book & Video Protocol',
          suggestedPrice: priceTier || 39,
          estimatedMonthlyRevenue: '$2,800 - $4,500/mo',
          targetAudience: targetAudience || 'Braiding clients seeking 8+ week retention & scalp health',
          overview: `An authoritative digital playbook created by Princess AHB master braiders to empower clients and braiders with salon-grade care protocols.`,
          modules: [
            {
              title: 'Module 1: The Tension-Free Foundation',
              summary: 'Anatomy of protective styling and safeguarding hair follicles from traction alopecia.',
            },
            {
              title: 'Module 2: The 7-Day Nighttime Preservation Ritual',
              summary: 'Silk bonnets, crown hydration mists, and edge-soothing techniques.',
            },
            {
              title: 'Module 3: DIY Botanical Scalp Elixir Recipes',
              summary: 'Formulating natural peppermint, rosemary, and batana oil treatments at home.',
            },
            {
              title: 'Module 4: The Safe Takedown & Detangling Protocol',
              summary: 'Step-by-step unbraiding checklist to prevent shedding and breakage.',
            },
          ],
          bonuses: [
            'Printable Braid Care Daily Calendar (PDF)',
            'Exclusive $25 In-Salon Voucher for Princess AHB Services',
            'Stylist Consultation Checklist',
          ],
          salesEmailCopy: `Subject: Never lose your edges again: The secret to 8-week protective styling\n\nHey Queen,\n\nHow much do you spend on fresh braids each year? Don't let your investment wash down the drain within 3 weeks. Princess AHB just released our definitive guide to effortless braid longevity. Download your copy today and receive an immediate $25 voucher toward your next salon visit.`,
        },
      });
    }

    const prompt = `You are StudioCreations AI, an autonomous digital product forge for "Princess African Hair Braiding & Collective" (Princess AHB).
Princess AHB wants to sell high-margin digital products (eBooks, video guides, salon templates, audio affirmations, business calculators) to:
1) Educate salon clients and generate leads.
2) Monetize traffic autonomously.
3) Train aspiring braiders on running a 6-figure braiding business.

Parameters:
- Product Topic / Focus: ${topic || 'French Curl & Boho Knotless Braid Maintenance'}
- Target Audience: ${targetAudience || 'Clients who wear braids regularly or braiders scaling their chair'}
- Product Format: ${format || 'Comprehensive eBook + Video Checklist'}
- Target Price: $${priceTier || 39}
- Specific Brief: ${customBrief || 'Create a digital asset that drives both standalone passive sales and in-salon appointment upsells'}

Generate a production-ready digital product package.
Respond strictly in JSON:
{
  "title": "Compelling luxury product title",
  "subtitle": "Clear, high-converting subtitle",
  "category": "e.g. Masterclass & Blueprint / Digital Workbook",
  "suggestedPrice": 39,
  "estimatedMonthlyRevenue": "e.g. $3,200/mo",
  "targetAudience": "Description of ideal purchaser",
  "overview": "3 sentence description of why this product is indispensable",
  "modules": [
    { "title": "Module name", "summary": "Detailed lesson outline" },
    { "title": "Module name", "summary": "Detailed lesson outline" },
    { "title": "Module name", "summary": "Detailed lesson outline" },
    { "title": "Module name", "summary": "Detailed lesson outline" }
  ],
  "bonuses": ["Bonus 1 item", "Bonus 2 item", "Bonus 3 item"],
  "salesEmailCopy": "High-converting launch email with subject and body"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/agents/create-digital-product:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 3. SMART CLIENT OUTREACH & LEAD HUNTER API
// ==========================================
app.post('/api/agents/lead-outreach', async (req, res) => {
  try {
    const { campaignName, targetAudience, targetLocation, seasonOrEvent, offerDiscount } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        data: {
          campaignStrategy: `Multi-touch outreach targeting ${targetAudience || 'young professionals and students'} in ${targetLocation || 'Maryland & Atlanta'} for ${seasonOrEvent || 'upcoming vacation & holiday season'}.`,
          projectedBookings: '18 - 25 new appointments',
          projectedRevenue: '$4,500 - $6,800',
          channels: {
            sms: `✨ Princess AHB Alert: Getting ready for ${seasonOrEvent || 'the weekend'}? Our master braiders have 4 VIP spots left this Friday & Saturday in ${targetLocation || 'Landover & Jonesboro'}. Enjoy ${offerDiscount || '$25 off'} any Knotless or Twist style today with code GLOW25. Claim chair: princessahb.com/book`,
            instagramDm: `Hey Queen! 👑 We noticed you love flawless protective styling. Princess African Hair Braiding is opening exclusive early-access bookings for ${seasonOrEvent || 'this season'}. We’d love to crown you with our signature tension-free knotless braids! Here is a secret VIP link with ${offerDiscount || '$25 off'} just for you: princessahb.com/vip-offer`,
            emailBroadcast: {
              subject: `Ready to turn heads? Your ${seasonOrEvent || 'weekend'} braid appointment is waiting ✨`,
              body: `Hello Beautiful,\n\nWhether you're gearing up for a getaway, a special event, or simply want to wake up ready every morning without styling stress—Princess AHB has you covered.\n\nOur master braiders specialize in lightweight, tension-free braids that preserve your edges and elevate your confidence.\n\nBook your chair this week and use code GLOW25 for ${offerDiscount || '$25 off'} plus a free hair oil sample.\n\nSlots fill quickly—reserve yours now!`,
            },
            reelsHookScript: `3 mistakes that are ruining your knotless braids before week 3—and how our master braiders fix them instantly. Watch till the end for our secret tension-free edge technique!`,
          },
        },
      });
    }

    const prompt = `You are StyleScout AI, the autonomous Lead Acquisition & Outreach Agent for "Princess African Hair Braiding & Collective" (Princess AHB).
Goal: Generate a high-converting client outreach campaign that turns digital leads, cold prospects, and social followers into booked salon chairs.

Campaign Details:
- Campaign Theme: ${campaignName || 'Boho Knotless Summer Rush'}
- Target Audience: ${targetAudience || 'Women seeking vacation-ready protective styles'}
- Location Focus: ${targetLocation || 'Landover MD, Jonesboro GA, Chicago IL'}
- Seasonal Context / Event: ${seasonOrEvent || 'Summer vacations & weddings'}
- Incentive / Offer: ${offerDiscount || '$25 off first appointment or free scalp detox treatment'}

Generate a comprehensive multi-channel outreach kit.
Respond strictly in JSON:
{
  "campaignStrategy": "Strategic angle and psychology behind the campaign",
  "projectedBookings": "e.g. 20-30 appointments",
  "projectedRevenue": "e.g. $5,500+",
  "channels": {
    "sms": "High-converting SMS under 160 characters with CTA",
    "instagramDm": "Warm, authentic direct message for Instagram/TikTok leads",
    "emailBroadcast": {
      "subject": "Enticing subject line",
      "body": "Persuasive email newsletter body copy"
    },
    "reelsHookScript": "Viral 15-second hook and CTA script for Instagram Reels/TikTok"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/agents/lead-outreach:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 4. VIRTUAL CROWN CONCIERGE & STYLE ADVISOR
// ==========================================
app.post('/api/agents/ai-consultant', async (req, res) => {
  try {
    const { query, clientContext } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        answer: `Welcome to Princess African Hair Braiding! For questions regarding styles, length, or care: Boho Knotless Braids typically take 4.5 to 6 hours depending on size (medium to smedium) and length (mid-back to butt-length). We include braiding hair in all services and use genuine human hair curls for Boho styles to prevent tangling. To book or consult our braiders, explore our Booking section or download our Crown Longevity Guide!`,
      });
    }

    const prompt = `You are the Princess AHB Crown Concierge, an expert luxury hair stylist and consultant representing Princess African Hair Braiding (princessahb.com) and the Princess Braiders Collective.
You provide gracious, knowledgeable, culturally respectful, and practical advice on:
- African braiding styles: Knotless braids, Boho Goddess braids, Senegalese twists, French curl braids, Micro braids, Lemonade braids, Stitch cornrows, Loc retwists.
- Hair care, scalp health, tension-free parting, edge protection, hair preparation (blowout, wash, detangle).
- Estimated duration and hair extension requirements.
- Business scaling advice for braiders joining our collective.

Client Query: "${query}"
Context: ${JSON.stringify(clientContext || {})}

Give a warm, concise, expert response (max 3 paragraphs). Include a direct recommendation to book an appointment or explore the digital products.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error('Error in /api/agents/ai-consultant:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 5. TRICHOLOGY SCALP SOS & DIAGNOSTIC AGENT
// ==========================================
app.post('/api/agents/scalp-diagnostic', async (req, res) => {
  try {
    const { symptoms, weeksWearing, currentStyle, painLevel } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        data: {
          condition: 'Alkaline Scalp Irritation & Follicular Tension',
          severity: painLevel > 6 ? 'High (Action Required)' : 'Moderate',
          rootCause: 'The alkaline coating on synthetic braiding fibers combined with root tension has disrupted the scalp acid mantle.',
          immediateRelief: 'Rinse scalp gently with diluted organic apple cider vinegar (1:4 ratio with cool water) or apply cold chamomile tea compress. Do not scratch with fingernails to avoid micro-tearing the follicles.',
          recommendedHomeKit: 'Princess AHB Pre-Soaked ACV Anti-Itch Mist & Batana Edge Elixir ($38 Bundle)',
          recommendedSalonService: 'In-Salon Herbal Scalp Detox Steam & ACV Rinse ($35) or Painless Takedown Bar ($65)',
          canKeepStyle: painLevel > 7 ? 'Immediate takedown recommended to prevent traction alopecia' : 'Style can be preserved with targeted anti-itch mist & loosened edges',
        },
      });
    }

    const prompt = `You are the Princess AHB Scalp SOS & Trichology Diagnostic AI, an expert holistic hair and scalp specialist for African hair and protective styles.
Client Symptoms:
- Main Complaints: "${symptoms || 'Severe itchy scalp, bumps along hairline, feeling tight'}"
- Weeks in protective style: ${weeksWearing || 3} weeks
- Current hairstyle: "${currentStyle || 'Knotless Box Braids'}"
- Pain / Discomfort scale (1-10): ${painLevel || 6}

Provide an authoritative, empathetic diagnosis with clear solutions to relieve pain, protect edges, and recommend relevant at-home remedies or salon services.
Respond strictly in JSON:
{
  "condition": "Name of the scalp condition (e.g. Alkaline Contact Dermatitis, Follicular Traction Strain, or Sebum Impaction)",
  "severity": "Mild, Moderate, or Urgent Attention",
  "rootCause": "2 sentence clear explanation of why this happens with protective styling",
  "immediateRelief": "Step-by-step action the client can do right now at home in 5 minutes to stop pain or itch",
  "recommendedHomeKit": "Specific at-home physical remedy product (e.g. ACV Scalp Mist, Miracle Takedown Melt, Batana Edge Elixir)",
  "recommendedSalonService": "Service for clients not getting full braids today (e.g. Express Scalp Detox Steam $35, Painless Takedown Bar $65, or Perimeter Refresh $55)",
  "canKeepStyle": "Advice on whether they can safely keep their braids or must remove them immediately to save their hairline"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/agents/scalp-diagnostic:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// STATIC FILES & VITE DEV INTEGRATION
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Princess AHB server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
