import React, { useEffect, useState } from "react";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";

const FillinBlank = (props) => {

  const [questionList, setQuestionList] = useState([props.questionList]);
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);

  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      console.log("question in fill i blnk == ", questionList[0]);
    }, 5000);
  }, []);

  console.log("setAnswer------", answer);

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };
 

  console.log("setAnswer------", answer);

  return (
    <>
      <div>
        <div className="container-fluid col-12 mb-2">
          <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-6 mt-5 justify-content-center m-auto pb-2">
            <div className="form">
              <div className="card">
                <div className="container-fluid">
                  <div className="form p-3 mb-5">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                      <div className="row">
                        <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                          <label className="form-label">
                          <UnsafeComponent html={questionList[0].question}/>
                          </label>
                        </div>
                        {questionList[0].option.map((item) => (
                          <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-5">
                            <button
                              type="text"
                              key={item.id}
                              className="btn btn-primary bg-white btn-light"
                              style={{
                                borderColor:
                                  item.option_id === answer
                                    ? "#1979c1"
                                    : "#ffffff",
                              }}
                              onClick={() => setAnswer(item.option_id)}
                            >
                              {item.value}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
export default FillinBlank;
