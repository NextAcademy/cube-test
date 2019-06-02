import React, { useState } from "react";
import "./App.css";
import CubeInput from "./CubeInput";
import ResultDisplay from "./ResultDisplay";

const DAYS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31"
];

const sixToNine = arr => arr.map(digit => (digit === "6" ? "9" : digit));

const isCompleted = arr => arr.every(({ passed }) => passed);

function App(props) {
  const [numbers1, setNumbers1] = useState(new Array(6).fill(""));
  const [numbers2, setNumbers2] = useState(new Array(6).fill(""));
  const [attempt, setAttempt] = useState(0);
  const [results, setResults] = useState(
    DAYS.map(day => ({ day, passed: false }))
  );

  const checkMatch = day => {
    const mapped1 = sixToNine(numbers1);
    const mapped2 = sixToNine(numbers2);
    const [a, b] = day.replace(/6/g, "9");
    return (
      (mapped1.includes(a) && mapped2.includes(b)) ||
      (mapped1.includes(b) && mapped2.includes(a))
    );
  };

  const submitAnswer = () => {
    setAttempt(attempt + 1);
    setResults(
      results.map(({ day }) => ({
        day,
        passed: checkMatch(day)
      }))
    );
  };

  return (
    <div>
      <div id="challengeDescription">
        <h1>Self-Assessment</h1>
        <p>
          Are you ready to join NEXT Academy to learn to code? Find out by doing
          the challenge below! While we welcome everyone to join us, we also do
          not want people to join our programs and not truly benefit from them.
        </p>
        <h4>Scenario</h4>
        <p>
          Supposed a man has 2 cubes. Every morning this man wakes up, rotate
          the 2 cubes so that the front faces of the cubes represent the day of
          the month.
        </p>
        <p>
          For e.g. let’s say it’s the 15th of the month, the man would rotate
          one cube so that the digit 1 is on the front face and rotate the other
          cube so that the digit 5 is on the front face of the other cube.
        </p>

        <p>
          Another example, let’s say it’s the 1st of the month, the man would
          rotate one of the cubes so that the digit 0 is on the front face and
          rotate the other so that the digit 1 is on the front face.
        </p>

        <p>He does this every morning.</p>
        <h4>Question</h4>
        <p>
          Let’s say you are given 2 blank cubes and a permanent marker/sharpie.
          You can only write at most 1 digit per surface. What digits will you
          write on cube A and what digits will you write on cube B so that the
          man above can use your 2 written cubes to represent any day of the
          month.
        </p>

        <p>
          Single digit days from the 1st to the 9th of the month must be
          prepended with a 0, e.g. 01, 02, 03....
        </p>
        <h4>Important Note!</h4>

        <p>
          Try this question out yourself! Try not to Google or ask someone else.
          Take your time to solve it. Our data has shown that people who are
          capable of comprehending and solving at least 95% of this puzzle have
          higher chances of becoming successful at a software engineering role.
        </p>

        <p>
          At NEXT Academy, we focus a lot more on computational thinking and
          learning to code rather than teaching problem solving - 400 hours just
          isn’t enough to do that. If you find solving this puzzle completely
          impossible, you should focus on your comprehension and problem solving
          abilities before joining NEXT Academy to learn to code.
        </p>

        <p>Enter your answer below to see if you’re right or wrong!</p>
      </div>
      <hr />
      <div id="answer">
        <h2>Test Your Solution</h2>
        <div class="text-center pb-5">
          <h3>Cube One</h3>
          <CubeInput numbers={numbers1} setNumbers={setNumbers1} />
          <br />
          <br />
          <h3>Cube Two</h3>
          <CubeInput numbers={numbers2} setNumbers={setNumbers2} />
          <br />

          {isCompleted(results) ? (
            <h1>Congratulations! :)</h1>
          ) : (
            <button onClick={submitAnswer}>
              {attempt > 0 ? "Try Again!" : "Submit Answer"}
            </button>
          )}

          {attempt > 0 && (
            <>
              <div>Attempt: {attempt}</div>
              <ResultDisplay results={results} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
