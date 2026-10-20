(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const state = { profile: {}, answers: {}, order: [], index: 0, report: null };
  const dimensions = {
    relevance: { label: "Role relevance", weight: 25 },
    achievements: { label: "Achievements and evidence", weight: 25 },
    structure: { label: "Structure and readability", weight: 20 },
    skills: { label: "Skills and adaptability", weight: 15 },
    strategy: { label: "Application strategy", weight: 15 }
  };

  const scenarios = [{"id":"no-callbacks","category":"APPLICATION STRATEGY","dimension":"strategy","title":"The recruiter who never calls","story":"You have applied for 20 roles that seem relevant, but you have not received an interview invitation. Your CV has not been reviewed recently.","prompt":"What is the most useful first step?","options":[{"text":"Send the same CV to more vacancies and hope the numbers improve.","score":0,"feedback":"Sending more applications without checking the underlying problem often repeats the same result.","tip":"Review a small sample of target job descriptions and compare their requirements with the evidence and wording in your CV."},{"text":"Compare my CV with target vacancies and check whether the most relevant evidence is easy to find.","score":3,"feedback":"This is the strongest starting point. It checks alignment before increasing application volume.","tip":"Make a short checklist of recurring requirements and ensure your CV supports each relevant claim with honest evidence."},{"text":"Add more design elements and personal details so the CV stands out.","score":1,"feedback":"Visual polish has a place, but extra decoration does not resolve missing evidence or weak role alignment.","tip":"Prioritize relevance, clear headings and evidence of results before changing visual styling."},{"text":"Assume I am underqualified and remove roles from my target list.","score":0,"feedback":"A lack of responses alone does not prove you are underqualified. The application and CV both need review.","tip":"Check whether the role is a reasonable match, then improve how your relevant skills and experience are presented."}],"strengths":["You recognize the need to review your application approach."],"improvements":["Review CV-to-role alignment before increasing application volume."],"actions":["Choose two or three target vacancies and identify their recurring requirements.","Rewrite the top third of your CV to communicate your fit quickly."]},{"id":"ats","category":"CV READABILITY","dimension":"structure","title":"The ATS screening problem","story":"A vacancy asks for project coordination, reporting and stakeholder communication. Your CV has these skills, but uses different wording and a complex multi-column layout.","prompt":"What should you do before applying?","options":[{"text":"Copy every phrase from the vacancy, even if I cannot support it.","score":0,"feedback":"Repeating keywords without evidence is misleading and does not demonstrate competence.","tip":"Use accurate role-relevant terminology only where it describes experience or skills you genuinely have."},{"text":"Use a clear layout and align relevant wording with the vacancy where it accurately describes my experience.","score":3,"feedback":"Good approach. Clear structure helps people scan your CV, while accurate terminology makes relevant experience easier to identify.","tip":"Use descriptive headings, consistent dates, selectable text and simple formatting. ATS systems differ, so no layout guarantees a pass."},{"text":"Add icons, charts and text boxes to make the page more modern.","score":0,"feedback":"Complex elements sometimes interfere with parsing and can make the content harder to scan.","tip":"Prefer a clean, readable document and check the exported PDF or document for correct text order."},{"text":"Hide keywords in white text so screening software detects them.","score":0,"feedback":"Hidden keywords are deceptive and risk damaging trust with recruiters.","tip":"Place relevant skills naturally in your profile, skills section and work examples."}],"strengths":["You have relevant skills to communicate."],"improvements":["Improve the visibility of relevant skills and simplify formatting."],"actions":["Use clear headings, consistent dates and a simple reading order.","Match relevant vacancy terminology honestly and support it with examples."]},{"id":"duties","category":"ACHIEVEMENTS","dimension":"achievements","title":"The responsibility trap","story":"Your work experience says you managed a team, prepared weekly reports and supported customer requests. The CV lists duties but gives little indication of results.","prompt":"How would you strengthen this section?","options":[{"text":"Add credible outcomes, scope and examples of what changed because of my work.","score":3,"feedback":"Strong choice. Evidence of outcomes helps readers understand the contribution behind the responsibility.","tip":"Where possible, include verified numbers, time saved, volume handled, quality improvements or stakeholder outcomes. Never invent metrics."},{"text":"Use more impressive adjectives such as exceptional, world-class and outstanding.","score":0,"feedback":"Broad claims are hard to verify and do not show what you contributed.","tip":"Replace self-praise with specific actions and evidence."},{"text":"Keep only the job title because recruiters already know what the role involves.","score":0,"feedback":"Job titles vary between employers. A concise example helps explain the scope and relevance of your work.","tip":"Choose two to four relevant achievements or contributions for each recent role."},{"text":"Invent percentages to make my contribution look measurable.","score":0,"feedback":"Invented figures misrepresent your experience and create credibility risks.","tip":"Use records or reasonable, clearly explained estimates where appropriate. If no metric exists, describe the result qualitatively."}],"strengths":["You have practical responsibilities to draw from."],"improvements":["Translate duties into credible evidence of contribution."],"actions":["For each recent role, list actions, scope and outcomes.","Add metrics only when they are accurate and explainable."]},{"id":"graduate","category":"EARLY CAREER","dimension":"achievements","title":"The graduate with limited work experience","story":"You are applying for your first full-time role. You have completed academic projects, helped organize a student event and taken a short online course, but you have no formal employment history.","prompt":"What belongs in your CV?","audiences":["student","early"],"options":[{"text":"Include relevant projects, internships, volunteering and practical skills, clearly labelled.","score":3,"feedback":"These experiences provide evidence of skills even when you have not held a full-time job.","tip":"Describe the goal, your contribution, tools used and outcome of each relevant project."},{"text":"Create a fictional internship to fill the experience section.","score":0,"feedback":"False employment details undermine trust and risk future consequences.","tip":"Use an honest projects or relevant experience section instead."},{"text":"Leave out all experience and submit only my academic certificate.","score":0,"feedback":"Education matters, but relevant projects and activities often give employers a better view of your abilities.","tip":"Include relevant education, projects, volunteering, placements and practical work."},{"text":"List every course I have ever watched, whether relevant or not.","score":1,"feedback":"Learning shows initiative, but an unfiltered list can obscure the skills most relevant to the role.","tip":"Prioritize recent, relevant courses and show where you applied what you learned."}],"strengths":["You have learning and project experience to present."],"improvements":["Bring practical evidence and relevant projects into view."],"actions":["Create a Projects or Relevant Experience section.","Explain your personal contribution and the skills demonstrated in each example."]},{"id":"career-gap","category":"LINKEDIN OPTIMIZATION","dimension":"strategy","title":"The LinkedIn profile that gets overlooked","story":"You have a complete LinkedIn profile, but recruiters rarely view it and it does not clearly communicate the role you want next.","prompt":"What should you improve first?","options":[{"text":"Rewrite the headline to reflect your target role and strongest relevant value, then align the About section and experience with evidence.","score":4,"feedback":"A focused headline and coherent profile help people quickly understand your professional direction.","tip":"Use role-relevant terms naturally and support claims with specific achievements."},{"text":"Add as many popular skills and keywords as possible, even if some are unrelated.","score":1,"feedback":"Unrelated keywords can weaken your positioning and make the profile feel unfocused.","tip":"Prioritise skills and phrases that genuinely match your experience and target roles."},{"text":"Keep the profile mostly blank and rely on the CV to explain everything.","score":0,"feedback":"A sparse profile misses the chance to present a consistent professional story.","tip":"Complete your headline, About, experience, skills and contact preferences."},{"text":"Use the same generic headline as everyone else in your profession.","score":2,"feedback":"A generic headline communicates a field, but not your specific value or direction.","tip":"Combine your role or specialism with a credible strength or area of impact."}],"strengths":["You can present your experience with an honest timeline."],"improvements":["Keep career chronology clear and avoid overexplaining private matters."],"actions":["Check dates and employment history for consistency.","Prepare a short, neutral explanation if an interviewer asks about the gap."],"strength":"You understand the importance of a clear, consistent professional brand.","improvement":"Align your LinkedIn headline, About section and experience with your target role.","action":"Rewrite your LinkedIn headline and About section, then add two evidence-backed achievements."},{"id":"one-cv","category":"INTERVIEW PREPARATION","dimension":"strategy","title":"The interview question you did not expect","story":"An interviewer asks you to describe a difficult work situation, what you personally did, and what changed as a result. You know the experience but your answer becomes long and unclear.","prompt":"How should you prepare to answer this type of question?","options":[{"text":"Prepare a concise STAR example: Situation, Task, Action and Result, clearly separating your contribution from the team's.","score":4,"feedback":"The STAR structure helps make behavioural answers specific, logical and easy to follow.","tip":"Practise aloud and include a measurable or observable result where possible."},{"text":"Memorise a long answer word for word and repeat it regardless of the question.","score":1,"feedback":"Rigid scripts can sound unnatural and may not answer the question asked.","tip":"Prepare story outlines and adapt them to the interviewer’s actual question."},{"text":"Speak generally about what a good employee should do without giving a real example.","score":0,"feedback":"Interviewers usually need evidence of how you handled a real situation.","tip":"Choose examples that demonstrate your own decisions, actions and outcomes."},{"text":"Focus only on the situation and avoid explaining your actions or results.","score":2,"feedback":"Context matters, but your actions and outcomes show what you contributed.","tip":"Keep the context brief and devote most of your answer to action and result."}],"strengths":["You have a reusable base CV."],"improvements":["Make the strongest role-relevant evidence more prominent."],"actions":["Maintain a master CV with your complete accurate history.","Tailor the profile, skills and selected achievements for each suitable role."],"strength":"You recognise that interview answers need to be structured and evidence-based.","improvement":"Practise concise behavioural answers that show your personal contribution and outcomes.","action":"Prepare three STAR stories covering achievement, challenge and teamwork, then practise each aloud."},{"id":"skills-proof","category":"LINKEDIN OPTIMIZATION","dimension":"skills","title":"The LinkedIn skills section","story":"Your LinkedIn profile lists many skills, but the most relevant ones for your target job are buried among unrelated endorsements and older capabilities.","prompt":"What is the strongest way to improve this section?","options":[{"text":"Prioritise relevant, demonstrable skills that match target roles, and reinforce them through experience, projects and recommendations.","score":4,"feedback":"Relevant skills supported by evidence make your profile more credible and easier to assess.","tip":"Review the skills requested in target vacancies and remove or deprioritise those that do not support your direction."},{"text":"List every skill you have ever used, regardless of relevance.","score":1,"feedback":"An unfiltered list can obscure your strongest and most current capabilities.","tip":"Keep the profile focused on skills relevant to your next career step."},{"text":"Add skills you have seen in job descriptions even if you cannot demonstrate them.","score":0,"feedback":"Claiming skills you cannot substantiate can undermine trust in your profile and interviews.","tip":"Only list skills you can explain and support with examples."},{"text":"Leave the skills section empty because recruiters only read job titles.","score":0,"feedback":"This removes a useful way to communicate your capabilities and relevance.","tip":"Use the skills section as a supporting signal, not a substitute for evidence in your experience."}],"strengths":["You have identified skills relevant to your target work."],"improvements":["Support priority skills with examples and practical evidence."],"actions":["Select the five to eight most relevant skills for the target role.","Add examples that demonstrate how you applied those skills."],"strength":"You understand that skills should connect to the work you want to do.","improvement":"Make your LinkedIn skills relevant, current and supported by evidence elsewhere in your profile.","action":"Choose your 10 most relevant skills and check that your experience or projects provide evidence for them."},{"id":"career-change","category":"CAREER POSITIONING","dimension":"relevance","title":"The career change","story":"You are moving into a new industry. Your previous job title is different, but you have experience in planning, customer communication, reporting or managing projects.","prompt":"How should you position your CV?","audiences":["career-change"],"options":[{"text":"Connect transferable skills to the target role and add relevant projects, learning or experience.","score":3,"feedback":"This helps recruiters see the bridge between your past experience and the role you want.","tip":"Use a focused profile and specific examples. Be clear about new skills you are still developing."},{"text":"Hide my previous job titles so nobody knows my background.","score":0,"feedback":"Removing context makes your experience difficult to assess and may create questions.","tip":"Keep accurate job titles and explain the relevance of your experience through the examples you choose."},{"text":"Claim professional experience in the new industry before I have it.","score":0,"feedback":"Misrepresenting experience can undermine trust.","tip":"Show adjacent experience, portfolio work, training and practical projects honestly."},{"text":"Use a generic objective saying I want a challenging opportunity.","score":1,"feedback":"A generic objective does not explain why your background fits the new role.","tip":"Write a targeted profile that names your transferable strengths and the value you offer."}],"strengths":["You have transferable experience to build on."],"improvements":["Explain the connection between previous work and the target role."],"actions":["Identify three transferable skills the target role requires.","Add one credible example for each skill and show relevant learning or projects."]},{"id":"outdated","category":"CAREER PROGRESSION","dimension":"skills","title":"The outdated senior CV","story":"You have many years of experience, but your CV spends most of its space on early roles and older responsibilities. Your recent leadership work is difficult to find.","prompt":"What should change?","audiences":["mid","senior"],"options":[{"text":"Give more space to recent, relevant leadership, decisions, scope and outcomes.","score":3,"feedback":"Senior CVs need to show the level of responsibility and impact expected for the target role.","tip":"Prioritize recent evidence and summarize older roles when detailed descriptions no longer add much value."},{"text":"Make every role equally long to show a complete career history.","score":1,"feedback":"Equal space does not reflect the differing relevance of each role.","tip":"Use space according to relevance, seniority and the requirements of the target position."},{"text":"List a long set of leadership adjectives without examples.","score":0,"feedback":"Leadership claims are stronger when supported by decisions, team scope and outcomes.","tip":"Show what you led, the scale or complexity, and what changed."},{"text":"Remove all recent technical skills because senior staff do not need them.","score":0,"feedback":"Relevant technical and digital skills still matter when they relate to the role.","tip":"Keep current, role-relevant skills and show how you apply them at the appropriate level."}],"strengths":["You have substantial experience to draw on."],"improvements":["Bring recent impact and role-relevant leadership to the foreground."],"actions":["Prioritize recent roles and achievements that match the target position.","Summarize older experience and refresh the skills section."]},{"id":"length","category":"STRUCTURE AND READABILITY","dimension":"structure","title":"The overcrowded CV","story":"Your CV is four pages long, uses small text and repeats similar duties across several roles. You are unsure what to remove.","prompt":"What should you prioritize?","options":[{"text":"Remove repetition, improve scanning and retain relevant evidence. Let role and career context guide length.","score":3,"feedback":"A focused CV is easier to review. There is no universal page count that fits every candidate and profession.","tip":"Use concise bullets, readable font sizes and consistent headings. Keep detail that supports the role you want."},{"text":"Shrink the font until everything fits on one page.","score":0,"feedback":"A crowded page is harder to read and may undermine the presentation.","tip":"Edit for relevance and use whitespace rather than forcing all content onto one page."},{"text":"Remove dates and headings to save space.","score":0,"feedback":"Dates and headings help readers understand your career history.","tip":"Keep clear structure and shorten repetitive descriptions instead."},{"text":"Keep every duty from every role because nothing should be left out.","score":0,"feedback":"A CV is a targeted summary, not a complete job diary.","tip":"Prioritize evidence that supports the target role and summarize less relevant details."}],"strengths":["You have experience and information to work with."],"improvements":["Improve readability and reduce repeated or low-relevance content."],"actions":["Remove duplicate duties and prioritize evidence relevant to the target role.","Use readable text, consistent headings and enough whitespace."]},{"id":"digital-skills","category":"FUTURE READINESS","dimension":"skills","title":"The digital skills gap","story":"A vacancy mentions digital collaboration, data handling and emerging workplace tools. You have some experience but have not reviewed your skills section recently.","prompt":"What is a responsible next step?","options":[{"text":"Check the actual role requirements, list tools I know, and close relevant gaps through practical learning.","score":3,"feedback":"This keeps your CV accurate while giving you a plan to strengthen skills the role needs.","tip":"Name tools you have used, the level of work you performed and any practical project that demonstrates learning."},{"text":"Claim advanced proficiency in every tool listed in the vacancy.","score":0,"feedback":"Unsupported proficiency claims create credibility risks during interviews or practical tests.","tip":"State your real level and build evidence through relevant practice."},{"text":"Ignore all digital skills because employers only care about experience.","score":0,"feedback":"Digital skills are relevant in many roles, though their importance varies by position.","tip":"Prioritize the tools and capabilities named in suitable vacancies."},{"text":"Add a list of AI tools even if I have never used them.","score":0,"feedback":"A tool name alone does not prove competence.","tip":"Use tools responsibly, learn through practical tasks and describe only genuine experience."}],"strengths":["You are aware that skills requirements change."],"improvements":["Keep skills accurate, relevant and supported by practical use."],"actions":["Compare your skills with a few recent vacancies in your target field.","Choose one high-value gap and create a practical learning project or evidence of competence."]},{"id":"interview-mismatch","category":"CONSISTENCY","dimension":"relevance","title":"The interview that does not follow","story":"You sometimes get interviews, but hiring managers seem unsure how your experience relates to the role. Your CV headline says one thing while your recent achievements emphasize something else.","prompt":"What should you review?","options":[{"text":"Align the headline, profile, skills and experience around a clear and truthful career direction.","score":3,"feedback":"A consistent story helps a recruiter understand your fit and gives you a clear basis for interview examples.","tip":"Do not force every role into one narrative. Highlight the most relevant evidence for the opportunity."},{"text":"Change the facts in my work history to match the vacancy more closely.","score":0,"feedback":"Changing facts is misleading and creates inconsistencies.","tip":"Keep your history accurate and change only the emphasis and wording where truthful."},{"text":"Add a different career objective to every section of the CV.","score":0,"feedback":"Conflicting messages make your professional direction harder to understand.","tip":"Use one focused profile and consistent evidence that supports the role you seek."},{"text":"Remove all achievements and rely on the interview to explain my experience.","score":0,"feedback":"The CV should provide enough evidence to help the recruiter understand your fit before the interview.","tip":"Include concise examples of relevant work and prepare to expand on them in conversation."}],"strengths":["Your experience is generating some interview interest."],"improvements":["Make your target direction and supporting evidence consistent."],"actions":["Review the headline, profile and recent experience for a consistent message.","Prepare short interview examples that expand on your strongest CV evidence."]},{"id":"keyword-stuffing","category":"ATS AND KEYWORDS","dimension":"relevance","title":"The keyword-stuffing temptation","story":"You have heard that applicant tracking systems look for keywords. A vacancy mentions Excel, customer relationship management and data reporting, so you consider repeating those terms several times in your CV.","prompt":"What is the most effective and honest approach?","options":[{"text":"Use relevant terms naturally and connect them to real skills or work examples.","score":3,"feedback":"Strong choice. Relevant terminology helps communicate fit when it accurately reflects your experience. Repetition without context adds little value.","tip":"Use the employer's wording when it truthfully describes your skills, then support it with examples in your profile, skills section or experience."},{"text":"Repeat each keyword as many times as possible, even when the sentences sound unnatural.","score":0,"feedback":"Keyword stuffing makes the CV harder to read and does not prove that you have the skill.","tip":"Prioritize clear writing and relevant evidence. Screening systems differ, so no keyword trick guarantees selection."},{"text":"Hide keywords in white text at the bottom of the document.","score":0,"feedback":"Hidden text is deceptive and risks undermining trust with recruiters.","tip":"Keep all CV content visible, accurate and useful to a human reader."},{"text":"Avoid all keywords and use only broad personal qualities.","score":1,"feedback":"General qualities alone do not show whether your experience matches the vacancy's practical requirements.","tip":"Name relevant skills and tools you genuinely know, and add a short example of how you have used them."}],"strengths":["You are considering how your CV communicates relevant skills."],"improvements":["Use relevant keywords naturally and support them with credible examples."],"actions":["Identify recurring skills and tools in suitable vacancies.","Use accurate terminology in context and remove repeated keywords that add no evidence."]},{"id":"contact-details","category":"CV BASICS","dimension":"structure","title":"The missing contact details","story":"A recruiter likes your experience but your CV uses an old email address, an inactive phone number and a long home address. You have not checked these details for months.","prompt":"What should you do before sending the next application?","options":[{"text":"Verify a professional email address and active phone number, and include only location details relevant to the application.","score":3,"feedback":"Correct. Accurate, accessible contact details help employers reach you while limiting unnecessary personal information.","tip":"Check your email and phone number carefully. A city or region is often enough; avoid including sensitive details such as identity numbers or a full home address unless there is a specific need."},{"text":"Include every personal detail, including date of birth, identity number and full home address.","score":0,"feedback":"Extra personal data is usually unnecessary and increases privacy exposure.","tip":"Share only contact and location information needed for the job search. Follow specific application instructions when relevant."},{"text":"Leave out all contact details and expect the recruiter to search for me online.","score":0,"feedback":"This creates an avoidable barrier for recruiters who want to contact you.","tip":"Provide at least one reliable professional email address and a working phone number when appropriate."},{"text":"Use a casual email address because the CV content matters more than contact presentation.","score":1,"feedback":"The experience matters most, but professional contact details help create a clear and credible application.","tip":"Use an email address based on your name where possible, and check it regularly."}],"strengths":["You have an opportunity to make it easier for recruiters to contact you."],"improvements":["Keep contact information accurate, professional and proportionate."],"actions":["Verify your email address and phone number before every application.","Remove unnecessary personal data and keep contact details easy to find."]},{"id":"ai-assisted-writing","category":"CREDIBILITY AND ACCURACY","dimension":"achievements","title":"Using AI to improve your CV","story":"You use an AI writing tool to polish a CV bullet. The suggested version sounds impressive but includes a result and software experience you have not personally verified.","prompt":"What should you do before using the rewritten bullet?","options":[{"text":"Check every claim, correct unsupported details and keep only statements I can explain with real examples.","score":3,"feedback":"Strong choice. Writing tools help with clarity, but you remain responsible for the accuracy of every claim in your CV.","tip":"Use AI to improve structure or wording, not to invent achievements, metrics, employers, qualifications or technical skills. Remove confidential information before using external tools."},{"text":"Use the wording as written because polished language makes the CV more competitive.","score":0,"feedback":"Polished language does not make unsupported claims true. Recruiters might ask you to explain them.","tip":"Review each statement against your actual work history and keep evidence you are comfortable discussing."},{"text":"Add extra metrics and achievements generated by the tool to make the CV stand out.","score":0,"feedback":"Invented results misrepresent your experience and can damage your credibility.","tip":"Use verified numbers when available. If you do not have a metric, describe the contribution honestly without fabricating one."},{"text":"Never use any digital writing support, even for spelling or clarity.","score":1,"feedback":"Writing tools are not inherently unsuitable. The important issues are accuracy, confidentiality and human review.","tip":"Use support tools carefully, protect sensitive information and personally verify the final CV."}],"strengths":["You are looking for ways to communicate your experience clearly."],"improvements":["Check the accuracy and confidentiality of any AI-assisted CV content."],"actions":["Verify every claim, number, qualification and tool named in your CV.","Use writing tools for clarity while keeping the content truthful and protecting confidential information."]}];

  const profileToAudience = (profile) => {
    if (profile.experience === "student" || profile.experience === "early") return "early";
    if (profile.experience === "senior") return "senior";
    if (profile.experience === "career-change" || profile.goal === "career-change" || profile.goal === "return") return "career-change";
    if (profile.experience === "mid") return "mid";
    return "general";
  };

  function buildOrder() {
    const audience = profileToAudience(state.profile);
    const preferred = scenarios.filter(s => !s.audiences || s.audiences.includes(audience));
    const general = scenarios.filter(s => !s.audiences);
    const pool = [...preferred, ...general.filter(s => !preferred.includes(s))];
    // Always begin with a broadly useful question. Audience-specific scenarios appear early.
    const first = scenarios.find(s => s.id === "no-callbacks");
    const rest = pool.filter(s => s.id !== first.id);
    const selected = [first, ...rest].slice(0, 15);
    // Add a couple of broad scenarios so every assessment covers a useful range.
    for (const id of ["ats","duties","one-cv","skills-proof","length","digital-skills","interview-mismatch"]) {
      const item = scenarios.find(s => s.id === id);
      if (selected.length < 12 && item && !selected.includes(item)) selected.push(item);
    }
    return selected.slice(0, 15);
  }

  function showSection(id) {
    ["welcome","profile","audit","results","exit-confirm"].forEach(key => $(key).classList.toggle("hidden", key !== id));
    window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  }
  function startProfile() { showSection("profile"); $("candidate-name").focus(); }
  function beginAudit(event) {
    event.preventDefault();
    const form = new FormData($("profile-form"));
    state.profile = Object.fromEntries(form.entries());
    state.order = buildOrder();
    state.index = 0;
    state.answers = {};
    showSection("audit");
    renderQuestion();
  }
  function currentScenario() { return state.order[state.index]; }
  function renderQuestion() {
    const s = currentScenario();
    const answer = state.answers[s.id];
    $("question-counter").textContent = `QUESTION ${state.index+1} OF ${state.order.length}`;
    $("progress").setAttribute("aria-valuenow", String(Math.round(state.index/state.order.length*100)));
    $("progress-fill").style.width = `${Math.round(state.index/state.order.length*100)}%`;
    $("question-category").textContent = s.category;
    $("question-title").textContent = s.title;
    $("question-story").textContent = s.story;
    $("question-prompt").textContent = s.prompt;
    const options = $("answer-options");
    options.replaceChildren();
    s.options.forEach((opt,i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.setAttribute("aria-pressed", answer && answer.optionIndex === i ? "true" : "false");
      const letter = document.createElement("span"); letter.className="option-letter"; letter.textContent=String.fromCharCode(65+i);
      const copy = document.createElement("span"); copy.className="option-copy"; copy.textContent=opt.text;
      button.append(letter,copy);
      button.addEventListener("click",()=>chooseAnswer(i));
      options.append(button);
    });
    $("feedback").classList.toggle("hidden", !answer);
    if (answer) renderFeedback(s.options[answer.optionIndex]);
    $("previous-question").disabled = state.index === 0;
    $("next-question").disabled = !answer;
    $("next-question").textContent = state.index === state.order.length-1 ? "View my results →" : "Continue →";
    $("question-title").focus({preventScroll:true});
  }
  function chooseAnswer(index) {
    const s=currentScenario();
    state.answers[s.id]={optionIndex:index};
    const option=s.options[index];
    // Conditional routing: lower-scoring answers bring a related skill area forward;
    // strong answers prioritise an unassessed complementary area. All 15 scenarios remain included.
    const remaining = state.order.slice(state.index + 1).filter(item => !state.answers[item.id]);
    const answeredCategories = new Set(state.order.filter(item => state.answers[item.id]).map(item => item.category));
    const sameCategory = remaining.filter(item => item.category === s.category);
    const complementary = remaining.filter(item => item.category !== s.category && !answeredCategories.has(item.category));
    const other = remaining.filter(item => !sameCategory.includes(item) && !complementary.includes(item));
    let routed = remaining;
    if (option.score <= 1 && sameCategory.length) {
      routed = [...sameCategory, ...remaining.filter(item => !sameCategory.includes(item))];
      if ($("routing-hint")) $("routing-hint").textContent = "We’ll bring a related skill area forward so you can focus on what needs strengthening.";
    } else if (option.score >= 3 && complementary.length) {
      routed = [...complementary, ...remaining.filter(item => !complementary.includes(item))];
      if ($("routing-hint")) $("routing-hint").textContent = "Good choice. We’ll move to a complementary skill area to build a rounded picture.";
    } else {
      if ($("routing-hint")) $("routing-hint").textContent = "Your next scenario is selected to keep the assessment balanced.";
    }
    state.order = [...state.order.slice(0, state.index + 1), ...routed];
    $("answer-options").querySelectorAll(".answer-option").forEach((button,i)=>button.setAttribute("aria-pressed",String(i===index)));
    renderFeedback(option);
    $("feedback").classList.remove("hidden");
    $("next-question").disabled=false;
    $("next-question").focus({preventScroll:true});
  }
  function renderFeedback(option) {
    $("feedback-icon").textContent=option.score>=3?"✓":option.score===1?"!":"↗";
    $("feedback-heading").textContent=option.score>=3?"Strong approach":option.score===1?"Room to strengthen this approach":"Consider another approach";
    $("feedback-text").textContent=option.feedback;
    $("feedback-tip").textContent=option.tip;
  }
  function goNext() {
    if (!state.answers[currentScenario().id]) return;
    if (state.index < state.order.length-1) { state.index++; renderQuestion(); }
    else generateReport();
  }
  function goPrevious() {
    if (state.index>0) {state.index--;renderQuestion();}
  }
  function computeReport() {
    const bucket={}; Object.keys(dimensions).forEach(k=>bucket[k]={earned:0,max:0,count:0});
    const answered=[];
    state.order.forEach(s=>{
      const a=state.answers[s.id]; if (!a) return;
      const opt=s.options[a.optionIndex];
      bucket[s.dimension].earned+=opt.score;
      bucket[s.dimension].max+=Math.max(...s.options.map(option=>option.score));
      bucket[s.dimension].count++;
      answered.push({scenario:s,option:opt});
    });
    const categories={};
    Object.keys(dimensions).forEach(key=>{
      categories[key]=bucket[key].max ? Math.round(bucket[key].earned/bucket[key].max*100) : null;
    });
    const availableWeight=Object.keys(dimensions).reduce((sum,key)=>sum+(categories[key]===null?0:dimensions[key].weight),0);
    const score=Math.round(Object.keys(dimensions).reduce((sum,key)=>sum+(categories[key]===null?0:categories[key]*dimensions[key].weight),0)/(availableWeight||100));
    const weak=Object.keys(dimensions).filter(k=>categories[k]!==null).sort((a,b)=>categories[a]-categories[b]);
    const strong=Object.keys(dimensions).filter(k=>categories[k]!==null).sort((a,b)=>categories[b]-categories[a]);
    const strengths=[], improvements=[], actions=[];
    answered.forEach(({scenario,option})=>{
      const target=option.score>=3?strengths:improvements;
      const items=option.score>=3?scenario.strengths:scenario.improvements;
      items.forEach(item=>{if(!target.includes(item))target.push(item);});
      if(option.score<3) scenario.actions.forEach(item=>{if(!actions.includes(item))actions.push(item);});
    });
    strong.forEach(k=>{if(categories[k]>=67){const label=dimensions[k].label;const text=`Your answers show a useful foundation in ${label.toLowerCase()}.`;if(!strengths.includes(text))strengths.push(text);}});
    weak.forEach(k=>{if(categories[k]<67){const text=`Give more attention to ${dimensions[k].label.toLowerCase()}.`;if(!improvements.includes(text))improvements.push(text);}});
    if(!strengths.length) strengths.push("You have completed the audit and now have a clearer starting point for improving your CV.");
    if(!improvements.length) improvements.push("Keep checking your CV against each role and refresh examples as your experience grows.");
    if(!actions.length) actions.push("Review two suitable vacancies and confirm your CV presents accurate, relevant evidence for their main requirements.");
    weak.forEach(k=>{
      if(categories[k]!==null && categories[k]<80){
        const recommendation={
          relevance:"Tailor your profile and selected evidence to the role while keeping every claim accurate.",
          achievements:"Replace duty-only bullets with specific contributions and credible outcomes.",
          structure:"Check headings, chronology, text readability and consistent formatting.",
          skills:"Prioritize current, role-relevant skills and show where you have applied them.",
          strategy:"Review the fit between each vacancy and your CV before submitting."
        }[k];
        if(!actions.includes(recommendation)) actions.push(recommendation);
      }
    });
    return {score,categories,strengths:strengths.slice(0,4),improvements:improvements.slice(0,5),actions:actions.slice(0,5),answered};
  }
  function readiness(score) {
    if(score>=85)return {label:"Strong foundations",title:"You have a strong starting point",description:"Your scenario choices show a good understanding of how to present relevant experience. Keep tailoring your evidence to each role and review your actual CV before applying."};
    if(score>=67)return {label:"Promising foundation",title:"A few focused changes will help",description:"Your answers show useful CV awareness, with some areas worth improving. Prioritize the recommendations below and check each change against the roles you want."};
    if(score>=45)return {label:"Needs improvement",title:"Build a clearer CV strategy",description:"Your answers point to several opportunities to strengthen your CV. Work through the priority actions in order, focusing on evidence, relevance and readability."};
    return {label:"Start with the essentials",title:"Build the foundations first",description:"Your answers suggest starting with a few core habits: keep your CV accurate, make relevant evidence easy to find, and tailor it to suitable vacancies."};
  }
  function safeText(el,text){el.textContent=text;}
  function generateReport() {
    state.report=computeReport();
    const p=state.profile, r=state.report, status=readiness(r.score);
    const name=p.name.trim()||"Your CV audit";
    safeText($("report-name"),name);
    safeText($("report-target"),[p.targetRole.trim(),p.goal?({ "first-job":"First role","new-role":"New role","promotion":"Career progression","career-change":"Career change","return":"Return to work","general":"General CV improvement"}[p.goal]):""].filter(Boolean).join(" · ")||"Personalized CV readiness summary");
    safeText($("overall-score"),String(r.score));
    $("perfect-score-cta").classList.toggle("hidden", r.score !== 100);
    $("score-circle").setAttribute("aria-label",`Readiness score ${r.score} out of 100`);
    $("score-circle").style.background=`conic-gradient(#c99b35 ${r.score*3.6}deg, transparent 0)`;
    $("score-circle").style.backgroundOrigin="border-box";
    $("score-circle").style.borderColor="#34432c";
    $("score-circle").style.borderTopColor="#c99b35";
    $("score-circle").style.borderRightColor=r.score>=50?"#c99b35":"#34432c";
    safeText($("readiness-label"),status.label);
    safeText($("readiness-title"),status.title);
    safeText($("readiness-description"),status.description);
    safeText($("results-intro"),`${name}, your report is based on your answers to ${r.answered.length} recruitment scenarios. Use it as a practical checklist, not a prediction of hiring outcomes.`);
    const scores=$("category-scores");scores.replaceChildren();
    Object.keys(dimensions).forEach(k=>{
      const value=r.categories[k]; if(value===null)return;
      const row=document.createElement("div");row.className="category-row";
      const label=document.createElement("div");label.className="category-label";
      const nameEl=document.createElement("span");nameEl.textContent=dimensions[k].label;
      const scoreEl=document.createElement("strong");scoreEl.textContent=`${value}/100`;
      label.append(nameEl,scoreEl);
      const bar=document.createElement("div");bar.className="score-bar";bar.setAttribute("role","img");bar.setAttribute("aria-label",`${dimensions[k].label}: ${value} out of 100`);
      const fill=document.createElement("span");fill.style.width=`${value}%`;bar.append(fill);row.append(label,bar);scores.append(row);
    });
    fillList("strength-list",r.strengths);
    fillList("improvement-list",r.improvements);
    fillList("action-list",r.actions);
    const email=p.email.trim();
    const subject=encodeURIComponent("CV Optimization Enquiry | Noel Talent Services");
    const body=encodeURIComponent(`Hello Noel Talent Services,\n\nI have completed the CV Readiness Audit and would like to enquire about premium CV optimization support.\n\nName: ${p.name.trim()||"Not provided"}\nTarget role/industry: ${p.targetRole.trim()||"Not provided"}\nAudit score: ${r.score}/100\n\nPlease share details of your services and next steps.\n\nThank you.`);
    $("premium-email-link").href=`mailto:HR@noeltalents.com?subject=${subject}&body=${body}`;
    $("premium-email-link").setAttribute("aria-label","Open an email draft to enquire about premium CV support");
    state.report.status=status;
    showSection("results");
    $("results-title").focus?.({preventScroll:true});
  }
  function fillList(id,items){const ul=$(id);ul.replaceChildren();items.forEach(text=>{const li=document.createElement("li");li.textContent=text;ul.append(li);});}
  function getSummaryText(){
    const r=state.report,p=state.profile;
    return `NOEL TALENT SERVICES — CV READINESS AUDIT\nCandidate: ${p.name.trim()||"Not provided"}\nTarget role/industry: ${p.targetRole.trim()||"Not provided"}\nReadiness score: ${r.score}/100 — ${r.status.label}\n\nASSESSMENT BREAKDOWN\n${Object.keys(dimensions).filter(k=>r.categories[k]!==null).map(k=>`${dimensions[k].label}: ${r.categories[k]}/100`).join("\n")}\n\nWHAT YOU ARE DOING WELL\n${r.strengths.map(x=>"- "+x).join("\n")}\n\nAREAS TO IMPROVE\n${r.improvements.map(x=>"- "+x).join("\n")}\n\nPRIORITY ACTION PLAN\n${r.actions.map((x,i)=>`${i+1}. ${x}`).join("\n")}\n\nThis is a self-assessment based on scenario responses, not an evaluation of an uploaded CV or a prediction of hiring outcomes.\nContact: HR@noeltalents.com`;
  }
  function escapeXml(value){return String(value).replace(/[<>&'"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[c]));}
  function wrapText(text,maxChars){
    const words=String(text).split(/\s+/), lines=[];let line="";
    words.forEach(word=>{if((line+" "+word).trim().length>maxChars&&line){lines.push(line);line=word;}else line=(line+" "+word).trim();});
    if(line)lines.push(line);return lines;
  }
  function downloadCard(){
    const r=state.report,p=state.profile;
    const W=1200,H=1500,navy="#10243a",teal="#0d9488",muted="#667789";
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="1200" height="1500" fill="#f3f7f8"/><rect x="42" y="42" width="1116" height="1416" rx="34" fill="#fff" stroke="#dce5eb"/><path d="M42 76 Q42 42 76 42 H1124 Q1158 42 1158 76 V360 H42Z" fill="${navy}"/><circle cx="1060" cy="105" r="160" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="2"/><circle cx="1060" cy="105" r="210" fill="none" stroke="#ffffff" stroke-opacity=".06" stroke-width="2"/><rect x="82" y="82" width="54" height="54" rx="13" fill="${teal}"/><text x="109" y="119" font-family="Arial,sans-serif" font-weight="700" font-size="35" fill="#fff" text-anchor="middle">N</text><text x="154" y="103" font-family="Arial,sans-serif" font-size="19" font-weight="700" letter-spacing="3" fill="#fff">NOEL TALENT SERVICES</text><text x="154" y="130" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="#c6d7e2">CV AUDIT &amp; OPTIMIZATION</text><text x="82" y="203" font-family="Arial,sans-serif" font-size="18" letter-spacing="3" font-weight="700" fill="#e4c46d">CV READINESS AUDIT</text><text x="82" y="257" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#fff">${escapeXml((p.name.trim()||"Your CV audit").slice(0,36))}</text><text x="82" y="295" font-family="Arial,sans-serif" font-size="17" fill="#c6d7e2">${escapeXml((p.targetRole.trim()||"Personalized career summary").slice(0,55))}</text><circle cx="1015" cy="244" r="78" fill="none" stroke="#34432c" stroke-width="13"/><circle cx="1015" cy="244" r="78" fill="none" stroke="#c99b35" stroke-width="13" stroke-dasharray="${2*Math.PI*78*r.score/100} ${2*Math.PI*78}" transform="rotate(-90 1015 244)" stroke-linecap="round"/><text x="1015" y="242" text-anchor="middle" font-family="Arial,sans-serif" font-size="45" font-weight="700" fill="#fff">${r.score}</text><text x="1015" y="270" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" letter-spacing="1" fill="#c6d7e2">OUT OF 100</text>`;
    let y=415;
    svg+=`<text x="82" y="${y}" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="${navy}">${escapeXml(r.status.label)}</text>`;
    y+=34; wrapText(r.status.description,105).slice(0,3).forEach(line=>{svg+=`<text x="82" y="${y}" font-family="Arial,sans-serif" font-size="16" fill="${muted}">${escapeXml(line)}</text>`;y+=25;});
    y+=28;svg+=`<text x="82" y="${y}" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="${navy}">ASSESSMENT BREAKDOWN</text>`;y+=35;
    Object.keys(dimensions).filter(k=>r.categories[k]!==null).forEach(k=>{
      const value=r.categories[k];svg+=`<text x="82" y="${y}" font-family="Arial,sans-serif" font-size="15" fill="#435b6e">${escapeXml(dimensions[k].label)}</text><text x="1110" y="${y}" text-anchor="end" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="${navy}">${value}/100</text><rect x="82" y="${y+10}" width="1028" height="8" rx="4" fill="#e8eef1"/><rect x="82" y="${y+10}" width="${1028*value/100}" height="8" rx="4" fill="${teal}"/>`;y+=48;
    });
    y+=13;
    svg+=`<text x="82" y="${y}" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="${navy}">PRIORITY ACTIONS</text>`;y+=32;
    r.actions.slice(0,4).forEach((action,i)=>{
      svg+=`<circle cx="97" cy="${y-5}" r="15" fill="#e7f6f4"/><text x="97" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="${teal}">${i+1}</text>`;
      const lines=wrapText(action,108).slice(0,2);lines.forEach((line,j)=>{svg+=`<text x="125" y="${y-2+j*22}" font-family="Arial,sans-serif" font-size="14" fill="#435b6e">${escapeXml(line)}</text>`;});y+=Math.max(40,lines.length*22+13);
    });
    const footerY=Math.min(Math.max(y+15,1320),1370);
    svg+=`<line x1="82" y1="${footerY-32}" x2="1110" y2="${footerY-32}" stroke="#e1e9ed"/><text x="82" y="${footerY}" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="${navy}">Need professional CV support?</text><text x="82" y="${footerY+28}" font-family="Arial,sans-serif" font-size="15" fill="${teal}">HR@noeltalents.com</text><text x="1110" y="${footerY+28}" text-anchor="end" font-family="Arial,sans-serif" font-size="12" fill="${muted}">Educational self-assessment · Not a hiring prediction</text></svg>`;
    const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});const url=URL.createObjectURL(blob);
    const img=new Image();img.onload=()=>{const canvas=document.createElement("canvas");canvas.width=W;canvas.height=H;const ctx=canvas.getContext("2d");ctx.fillStyle="#f3f7f8";ctx.fillRect(0,0,W,H);ctx.drawImage(img,0,0);URL.revokeObjectURL(url);canvas.toBlob(png=>{if(!png){showToast("Unable to create the card in this browser.");return;}const a=document.createElement("a");a.href=URL.createObjectURL(png);a.download="noel-cv-readiness-card.png";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);showToast("Your results card has been downloaded.");},"image/png");};img.onerror=()=>{URL.revokeObjectURL(url);showToast("Your browser could not create the image. Try Print / Save PDF.");};img.src=url;
  }
  function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(()=>toast.classList.remove("show"),2800);}
  function copySummary(){
    const text=getSummaryText();
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(()=>showToast("Report summary copied.")).catch(()=>fallbackCopy(text));}
    else fallbackCopy(text);
  }
  function fallbackCopy(text){
    const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.append(ta);ta.select();
    try{document.execCommand("copy");showToast("Report summary copied.");}catch(e){showToast("Copy is unavailable. Use Print / Save PDF instead.");}ta.remove();
  }
  function restart(){state.profile={};state.answers={};state.order=[];state.index=0;state.report=null;$("profile-form").reset();showSection("welcome");$("start-btn").focus();}
  $("year").textContent=new Date().getFullYear();
  $("start-btn").addEventListener("click",startProfile);
  $("back-welcome").addEventListener("click",()=>showSection("welcome"));
  $("profile-form").addEventListener("submit",beginAudit);
  $("next-question").addEventListener("click",goNext);
  $("previous-question").addEventListener("click",goPrevious);
  $("exit-audit").addEventListener("click",()=>showSection("exit-confirm"));
  $("resume-audit").addEventListener("click",()=>showSection("audit"));
  $("confirm-exit").addEventListener("click",restart);
  $("restart-audit").addEventListener("click",restart);
  $("print-report").addEventListener("click",()=>window.print());
  $("download-card").addEventListener("click",downloadCard);
  $("copy-summary").addEventListener("click",copySummary);
})();
