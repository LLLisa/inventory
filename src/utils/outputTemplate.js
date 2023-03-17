import outputForm from './outputForm';

export default `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Whiteboard</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      padding: 2rem;
    }
    p{
      font-size: larger;
    }
  </style>
</head>
<body>
  <h1>Living the Program</h1>
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
      <h2><em>Just for today,</em> my thoughts will be on my recovery, living and enjoying life
        without the use of drugs.</h2>
      <ul>
        <li>
          <div class="prompt"></div>
          <div class="response"></div>
        </li>
      </ul>
    </section>
</body>
</html>`;
