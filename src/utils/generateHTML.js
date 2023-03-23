export default function (formData) {
  const promptArray = Object.keys(formData);
  const responseArray = Object.values(formData);

  const currentDate = new Date().toDateString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Inventory for ${currentDate}</title>
</head>
<body>
  <h1>Living the Program</h1>
  <div>${currentDate}</div>
  <h2>What Worked for Us: NA Daily Journal</h2>
  <p>The purpose of this daily inventory is to keep track of who we are and what we are
    doing today.
    Try to answer every question, every day. Keep your answers as simple and as honest
    as you can. If you miss a day, do not make it up later.
    Limit your answers and concerns to the past twenty-four hours and complete the
    questions at the end of the day.
    If you wish to share some of this journal, we suggest that you do so verbally.
    Remember that a daily inventory is not a test; there are no right or wrong answers.
    Do not get upset if you could have done better or if you fail to live up to your
    expectations of yourself. Remember, this is a program of growth and recovery and if
    you are clean today, you are doing something right.</p>
    <section>
      <h3><em>Just for today,</em> my thoughts will be on my recovery, living and enjoying life
        without the use of drugs.</h3>
      <ul>
        ${promptArray
          .map((prompt, i) => {
            if (i < 11) {
              return `<li>
            <div class="prompt">${prompt}</div>
            <div class="response">${responseArray[i]}</div>
          </li>`;
            }
          })
          .join('')}
      </ul>
    </section>
    <section>
      <h3><em>Just for today</em> I will have faith in someone in NA who believes in me
      and wants to help me in my recovery.</h3>
      <ul>
        ${promptArray
          .map((prompt, i) => {
            if (i >= 11 && i < 17) {
              return `<li>
            <div class="prompt">${prompt}</div>
            <div class="response">${responseArray[i]}</div>
          </li>`;
            }
          })
          .join('')}
      </ul>
    </section>
    <section>
      <h3><em>Just for today</em> I will have a program; I will try to follow it to the best
      of my ability.</h3>
      <ul>
        ${promptArray
          .map((prompt, i) => {
            if (i >= 17 && i < 27) {
              return `<li>
            <div class="prompt">${prompt}</div>
            <div class="response">${responseArray[i]}</div>
          </li>`;
            }
          })
          .join('')}
      </ul>
    </section>
    <section>
      <h3><em>Just for today,</em> through NA, I will try to get a better perspective on my life.</h3>
      <ul>
        ${promptArray
          .map((prompt, i) => {
            if (i >= 27 && i < 37) {
              return `<li>
            <div class="prompt">${prompt}</div>
            <div class="response">${responseArray[i]}</div>
          </li>`;
            }
          })
          .join('')}
      </ul>
    </section>
    <section>
      <h3><em>Just for today</em> I will be unafraid, my thoughts will be on my new
      associations, people who are not using and have found a new way of life.
      So long as I follow that way, I have nothing to fear.</h3>
      <ul>
        ${promptArray
          .map((prompt, i) => {
            if (i >= 37 && i < 45) {
              return `<li>
            <div class="prompt">${prompt}</div>
            <div class="response">${responseArray[i]}</div>
          </li>`;
            }
          })
          .join('')}
      </ul>
    </section>
    <section>
      <h3>Dear God, show me what I have done right and wrong today.
      Show me how I can better live and serve your will tomorrow.</h3>
      <ul>
      <li>
        <div class="prompt">Notes: </div>
        <div class="response">${responseArray[45]}</div>
      </li>
      </ul>
    </section>
    <br/>
    <br/>
    <p>Taken from the NA
    informational Pamphlet #9, "Living the Program". A physical copy of this IP is available
    from <a href='https://www.na.org'>the NA website</a> or <a href='https://www.na.org/meetingsearch/'>find an NA meeting near you.</a></p>
    <p>Copyright © 1983 by Narcotics Anonymous World Services, Inc. All rights reserved.<?p>
</body>
</html>`;
}
