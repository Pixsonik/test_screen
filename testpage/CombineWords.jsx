/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import { Row } from "react-bootstrap";

const CombineWords = (props) => {
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [option, setOption] = useState(["Dragon", "Wild", "Fly", "Animal"]);
  const [ques, setQues] = useState(["1", "2", "3", "4", "5", "6"]);
  const [noOfQ, setNoOfQ] = useState(["1", "2", "3"]);

  const [optionBlock1, setOptionBlock1] = useState("");
  const [optionBlock2, setOptionBlock2] = useState("");
  const [optionBlock3, setOptionBlock3] = useState("");
  const [optionBlock4, setOptionBlock4] = useState("");
  const [optionBlock5, setOptionBlock5] = useState("");
  const [optionBlock6, setOptionBlock6] = useState("");

  const [optionBlock1Id, setOptionBlock1Id] = useState("");
  const [optionBlock2Id, setOptionBlock2Id] = useState("");
  const [optionBlock3Id, setOptionBlock3Id] = useState("");
  const [optionBlock4Id, setOptionBlock4Id] = useState("");
  const [optionBlock5Id, setOptionBlock5Id] = useState("");
  const [optionBlock6Id, setOptionBlock6Id] = useState("");

  const [box1Filled, setBox1Filled] = useState(false);
  const [box2Filled, setBox2Filled] = useState(false);
  const [box3Filled, setBox3Filled] = useState(false);
  const [box4Filled, setBox4Filled] = useState(false);
  const [box5Filled, setBox5Filled] = useState(false);
  const [box6Filled, setBox6Filled] = useState(false);

  const [box1Border, setBox1Border] = useState(true);
  const [box2Border, setBox2Border] = useState(false);
  const [box3Border, setBox3Border] = useState(false);
  const [box4Border, setBox4Border] = useState(false);
  const [box5Border, setBox5Border] = useState(false);
  const [box6Border, setBox6Border] = useState(false);

  const [box1Pressed, setBox1Pressed] = useState(false);
  const [box2Pressed, setBox2Pressed] = useState(false);

  const [selectedButton, setSelectedButton] = useState([]);

  const [boxIndex, setBoxIndex] = useState(0);

  const [boxIndex0, setBoxIndex0] = useState("");
  const [boxIndex1, setBoxIndex1] = useState("");
  const [boxIndex2, setBoxIndex2] = useState("");

  const [disableBtn1, setDisableBtn1] = useState("");
  const [disableBtn2, setDisableBtn2] = useState("");
  const [disableBtn3, setDisableBtn3] = useState("");
  const [disableBtn4, setDisableBtn4] = useState("");
  const [disableBtn5, setDisableBtn5] = useState("");
  const [disableBtn6, setDisableBtn6] = useState("");

  const [dontMoveBorder, setDontMoveBorder] = useState(false);

  const [question, setQuestion] = useState("");
  const [qOptions, setQOptions] = useState("");

  const handleCategorySelect = (item, index) => {
    let selectedArray = selectedButton;

    if (selectedArray.indexOf(index) < 0) {
      selectedArray.push(index);
    } else {
      // this.selectedArray.splice(this.selectedArray.indexOf(index), 1)
      selectedArray.pop(index);
      console.log(
        " splice item  --->  ",
        selectedArray.splice(selectedArray.indexOf(index), 1)
      );
    }

    setSelectedButton(selectedArray);
    console.log("button   ---< ", selectedButton);
  };

  const disSelectCategorySelect = (item, index) => {
    let selectedArray = selectedButton;

    if (selectedArray.indexOf(index) < 0) {
      selectedArray.pop(index);
    } else {
      console.log(
        " splice item  --->  ",
        selectedArray.splice(selectedArray.indexOf(index), 1)
      );
    }

    setSelectedButton(selectedArray);
    console.log("button   ---< ", selectedButton);
  };

  const fillBox1 = (item, index, oid) => {
    box1Filled
      ? (setBox1Filled(true),
        setBox1Border(true),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock1(item),
        setOptionBlock1Id(oid),
        setBox1Filled(true),
        setBoxIndex0(index),
        setBox1Border(false),
        setBox2Border(box2Filled ? false : true),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false));
  };
  const fillBox2 = (item, index, oid) => {
    box2Filled
      ? (setBox2Filled(false),
        setBox1Border(false),
        setBox2Border(true),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock2(item),
        setOptionBlock2Id(oid),
        setBox2Filled(true),
        setBoxIndex1(index),
        setBox2Border(false),
        setBox2Border(false),
        setBox3Border(box3Filled ? false : true),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false));
  };

  const fillBox3 = (item, index, oid) => {
    box3Filled
      ? (setBox3Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(true),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock3(item),
        setOptionBlock3Id(oid),
        setBox3Filled(true),
        setBoxIndex2(index),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(box4Filled ? false : true),
        setBox5Border(false),
        setBox6Border(false));
  };

  const fillBox4 = (item, index, oid) => {
    box4Filled
      ? (setBox4Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(true),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock4(item),
        setOptionBlock4Id(oid),
        setBox4Filled(true),
        setBoxIndex(item),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(box5Filled ? false : true),
        setBox6Border(false));
  };

  const fillBox5 = (item, index, oid) => {
    box5Filled
      ? (setBox5Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(true),
        setBox6Border(false))
      : (setOptionBlock5(item),
        setOptionBlock5Id(oid),
        setBox5Filled(true),
        setBoxIndex(item),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(true),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(box6Filled ? false : true));
  };

  const fillBox6 = (item, index, oid) => {
    box6Filled
      ? (setBox6Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(true))
      : (setOptionBlock6(item),
        setOptionBlock6Id(oid),
        setBox6Filled(true),
        setBoxIndex(item),
        setBox6Border(false));
  };

  const handleBoxSelect = (data, index) => {
    console.log("itemmsas  --->  ", data, index);
    switch (index) {
      case 0:
        setBox1Filled(false);
        setBoxIndex(0);
        setDontMoveBorder(true);
        break;
      case 1:
        setBox2Filled(false);
        setBoxIndex(1);
        setDontMoveBorder(true);
        break;
      case 2:
        setBox2Filled(false);
        setBoxIndex(2);
        setDontMoveBorder(true);
        break;
      case 3:
        setBox3Filled(false);
        setBoxIndex(3);
        setDontMoveBorder(true);
        break;
      case 4:
        setBox4Filled(false);
        setBoxIndex(4);
        setDontMoveBorder(true);
        break;
      case 5:
        setBox5Filled(false);
        setBoxIndex(5);
        setDontMoveBorder(true);
        break;
      default:
        setBox6Filled(true);
        setBoxIndex("");
        break;
    }
  };

 
  return (
    <>
      <div >
        <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-6 mt-5 justify-content-center m-auto pb-2">
          <div className="form">
            <div className="card">
              <div className="container-fluid">
                <div className="form p-3 mb-5">
                  <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="counselling-Form ">
                      <div className="row">
                      <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                          <label className="form-label">
                          <UnsafeComponent html={questionList[0].question}/>
                          </label>
                        </div>
                        <div className="col-8">
                          <Row>
                            {questionList[0].option.map((item) => {
                              return (
                                <div sm={12} md={6} className=" col-6 mt-3">
                                  <button className="buttons col-12 col-sm-12 col-md-6 col-lg-12 mt-2">
                                  <UnsafeComponent html={item.value} />
                                  </button>
                                </div>
                              );
                            })}
                          </Row>
                        </div>
                        <div className="col-4">
                          {noOfQ.map((data, index) => (
                            <div className="d-flex mt-3">
                              <span className=" mt-4 ">=&nbsp;&nbsp;</span>
                              <button
                                className="buttons col-12 col-sm-12 col-md-12 col-lg-12 mt-2"
                                style={{
                                  borderColor: "#1979c1",
                                  borderStyle: "dotted",
                                }}
                              >
                                <UnsafeComponent html={data} />
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
      </div>
    </>
  );
};


function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default CombineWords;
