import React, { useEffect, useState } from "react";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
// import Home from "../assets/img/store.png";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Ques from "../../assets/img/schedule/ques.png";
import Clock from "../../assets/img/schedule/clock.png";
import Instru from "../../assets/img/schedule/instru.png";
import semIcon from "../../assets/img/semIcon/semester2.png";
import {
  chapterTestPreviewApi,
  chapterTestQuestionApi,
  testSessionApi,
  urlToken,
} from "../../api/api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Bronze from "../../assets/img/medal/bronz.png";
import Silver from "../../assets/img/medal/silver.png";
import Gold from "../../assets/img/medal/gold.png";

const user_Id = sessionStorage.getItem("UserId");

const ChapterTestDescription = () => {
  const [chapterId, setChapterId] = useState("");
  const [levelId, setLevelId] = useState("");
  // const [testLevel, setTestLevel] = useState("");
  // const [chapterName, setChapterName] = useState("");

  const [testDescription, setTestDescription] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const [sessionKey, setSessionKey] = useState("");
  const [isSessionCreated, setIsSessionCreated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  console.log(
    "subject info--------------",
    location.state.allInfo,
    location.state.levelName
  );

  useEffect(() => {
    testSessionCreator(location.state.chapter_id);
    setChapterId(location.state.chapter_id)
    setLevelId(location.state.testlevel);
    // console.log("level for test---", location.state.testlevel)
    setTimeout(() => {
      chapterTestDescription(location.state.chapter_id);
    }, 500);
  }, []);

  const testSessionCreator = (id) => {
    const url = testSessionApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      chapter_id: id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setSessionKey(resp.data.new_test_key);
        console.log('Session Creator', resp.data.new_test_key);
        setIsSessionCreated(true);
      })
      .catch((err) => {
        console.log("Error in Description", err);
      });
  };

  const chapterTestDescription = (id) => {
    const url = chapterTestPreviewApi();
    const body = {
      token: urlToken,
      chapter_id: id,
      level_id: location.state.testlevel,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setUserInfo(resp.data.data);
        setTestDescription(resp.data.data.description);
        console.log("chapter Description", resp.data.data);
      })
      .catch((err) => {
        console.log("Error in Description", err);
      });
  };

  const chapterTestQuestion = () => {
    const url = chapterTestQuestionApi();
    const body = {
      token: urlToken,
      chapter_id: chapterId,
      level: location.state.testlevel,
      test_key: sessionKey,
      status: "test",
      check: "incomplete",
    };
    console.log("chapter Desc",body)
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((resp) => {
        console.log("first", resp.data.data);

        return navigate("/testscreen", {
          state: {
            id:location.state.chapter_id,
            levelName: location.state.levelName,
            testlevel: location.state.testlevel,
            allInfo: location.state.allInfo,
            session_Key: sessionKey
          },
        });
      })
      .catch((error) => {
        console.log("error in fetching question list: ", error);
      })
    
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 mb-5">
          <div className="col-12 m-auto mt-5 pt-2">
            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-9 ">
              <div className="d-flex justify-content-start">
                <img
                  src={semIcon}
                  alt="semIcon mt-3"
                  style={{ width: "60px", height: "60px", marginTop: "20px" }}
                />
                <div className=" col-example text-left mt-3 ">
                  <div className="text-center">
                    <p
                      className="fw-bold mb-1 text-center ml-4"
                      style={{ color: "#1979C1", fontSize: "1.5rem" }}
                    >
                      {userInfo.chapter_name}
                    </p>
                    <p>Level: {location.state.levelName}</p>
                    <p
                      className="fw-normal mb-1"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {userInfo.level_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-9 mt-5">
              <div className="d-flex justify-content-around">
                <div className="p-2 col-example">
                  <div className="box chapterLevel text-center">
                    <div className="mx-2 p-1">
                      <img src={Bronze} alt="level" /><br/>
                    </div>
                      <p>60- 70%</p>
                  </div>
                </div>
                <div className="p-2 col-example">
                <div className="box chapterLevel text-center">
                    <div className="mx-2 p-1">
                      <img src={Silver} alt="level" /><br/>
                    </div>
                      <p>70% - 85%</p>
                  </div>
                </div>
                <div className="p-2 col-example">
                <div className="box chapterLevel text-center">
                    <div className="mx-2 p-1">
                      <img src={Gold} alt="level" /><br/>
                    </div>
                      <p>85% - 100%</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card bg-transparent col-12 col-sm-6 col-md-6 col-lg-9 m-auto mt-4"
              style={{ border: "2px solid #1979C1", borderRadius: "20px" }}
            >
              <div className="col-12 col-sm-6 col-lg-12 mt-3">
                <div className="d-flex justify-content-around">
                  <div className="row-example text-left text-center">
                    <img src={Ques} alt="" style={{ width: 50, height: 50 }} />
                    <span
                      className="fw-normal mb-1 mx-3"
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "40px",
                      }}
                    >
                      {userInfo.total_question}
                      <span
                        className="mb-1 mx-2"
                        style={{
                          color: "#A199A4",
                          // fontFamily: 'Open Sans',
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "24px",
                          lineHeight: "40px",
                        }}
                      >
                        Questions
                      </span>
                    </span>
                  </div>
                  <div className="col-example text-left text-center">
                    <img src={Clock} alt="" style={{ width: 50, height: 50 }} />
                    <span
                      className="fw-normal mb-1 mx-3"
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "40px",
                      }}
                    >
                      {userInfo.duration}
                      <span
                        className="mb-1 mx-2"
                        style={{
                          color: "#A199A4",
                          // fontFamily: 'Open Sans',
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "24px",
                          lineHeight: "40px",
                        }}
                      >
                        Minutes
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-12 mt-4">
                <h5 className="ml-4 mb-3">Instructions</h5>
                <ul style={{ listStyle: "none", lineHeight: "2.3rem" }}>
                  <li>
                    {testDescription.map((item, index) => (
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                          <div className="pt-2">
                            <img
                              src={Instru}
                              key={index + item.id}
                              alt=""
                              className=""
                              style={{
                                width: 40,
                                height: 40,
                                TextColor: "#1979c1",
                              }}
                            />
                          </div>
                          <div className="p-2 m-1 pt-2">
                            <span
                              className="instru"
                              style={{
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "24px",
                                lineHeight: "1.8rem",
                              }}
                            >
                              {item}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 mb-5 m-auto">
              <button
                type="submit"
                className="btn btn btn-block"
                style={{
                  backgroundColor: "#1979C1",
                  color: "#ffffff",
                  borderRadius: "2rem",
                }}
                onClick={() => chapterTestQuestion()}
              >
                <b style={{ fontSize: "1rem" }}>Start Test</b>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChapterTestDescription;
