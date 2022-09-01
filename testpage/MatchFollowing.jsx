import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
// import Draggable from "react-draggable";
// import './App.css';

const MatchFollowing = (props) => {
  const [testAnswer, setTestAnswer] = useState([]);
  const [testQuestion, setTestQuestion] = useState([]);

  const [questionList, setQuestionList] = useState([props.questionList]);

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);

  useEffect(() => {
    setTimeout(() => {
      console.log("question in mcq == ", questionList[0]);
    }, 50);
  }, []);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <>
      <div>
        <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-6 mt-5 justify-content-center pb-2">
          <div className="form">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="row">
                <div className="col">
                  <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                    <label className="form-label">
                      {questionList[0].question}
                    </label>
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <p style={{ marginLeft: "5rem" }}>Column A</p>
                    {questionList[0].cola.map((item) => (
                      <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-3 ">
                        <p
                          key={item}
                          id="openPopup"
                          className="btn btn-primary bg-white btn-light"
                          style={{
                            minWidth: "15rem",
                          }}
                          // onClick={() => setAnswer(item.ans)}
                        >
                          <UnsafeComponent html={item} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col" style={{ marginTop: "5rem" }}>
                  <div className="d-flex flex-column mb-3">
                    <p style={{ marginLeft: "5rem" }}>Column B</p>
                    <>
                      {questionList[0].colb &&
                        questionList[0].colb.map((item, index) => (
                          <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-3 mt-3">
                            <div
                              className="btn btn-primary bg-white btn-light"
                              style={{
                                borderColor:
                                  item.answer === item.answer
                                    ? "#1979c1"
                                    : "#ffffff",
                                minWidth: "15rem",
                              }}
                              onDragStart={(e) => dragStart(e, index)}
                              onDragEnter={(e) => dragEnter(e, index)}
                              onDragEnd={drop}
                              key={item.option_id}
                              draggable
                            >
                              <UnsafeComponent html={item.value} />
                            </div>
                          </div>
                        ))}
                    </>
                    {/* {answerData.map((item) => (
                                    <Draggable bounds="parent">
                                      <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-3 ">
                                        <p
                                          key={item.id}
                                          className="btn btn-primary bg-white btn-light"
                                          style={{
                                            //   borderColor:
                                            //     item.ans === answer
                                            //       ? "#1979c1"
                                            //       : "#ffffff",
                                            minWidth: "15rem",
                                          }}
                                          // onClick={() => setAnswer(item.ans)}
                                        >
                                          {item.ans}
                                        </p>
                                      </div>
                                    </Draggable>
                                  ))} */}
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

export default MatchFollowing;
