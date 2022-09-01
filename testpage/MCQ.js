import React, { useEffect, useState } from "react";
import Bg2 from "../../assets/img/Background/mathsBg.png";
import { Row } from "react-bootstrap";

const MCQ = (props) => {
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      console.log("question in mcq == ", questionList[0]);
    }, 50);
  }, []);

  const myStyle = {
    // backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  console.log("setAnswer------", answer);

  return (
    <>
      <div className="" style={myStyle}>
        <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 mt-5  m-auto">
          <div className="form">
            <div className="">
                {/* <div className="col-md-12 col-lg-12 col-sm-12"> */}
                <div className="row">
                  <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                    <label className="form-label">
                    <UnsafeComponent html={questionList[0].question}/>
                    </label>
                    <br />
                  </div>
                  <div className="col-8">
                    <Row>
                      {questionList[0].option.map((item) => (
                        <div sm={12} md={6} className=" col-6 mt-3">
                          <button
                            className="buttons col-12 col-sm-12 col-md-6 col-lg-12 mt-2 mb-4"
                            type="text"
                            key={item.id}
                            // className="btn btn-primary xl bg-white "
                            style={{
                              borderColor:
                                item.option_id === answer
                                  ? "#1979c1"
                                  : "#ffffff",
                                  
                            }}
                            onClick={() =>
                              setAnswer(questionList[0].id, item.option_id)
                            }
                          >
                            <UnsafeComponent html={item.value} />
                          </button>
                        </div>
                      ))}
                    </Row>
                  </div>
                </div>
                {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default MCQ;
