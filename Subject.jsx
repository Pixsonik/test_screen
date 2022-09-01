import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import { ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addChapterApi,
  createSemesterListApi,
  getChapterLevelApi,
  getChaptersListApi,
  getSemesterChapterListApi,
  getSemesterListApi,
  urlToken,
} from "../../api/api";
import axios from "axios";
import semIcon from "../../assets/img/semIcon/semester2.png";
import Bronze from "../../assets/img/medal/bronz.png";
import Silver from "../../assets/img/medal/silver.png";
import Gold from "../../assets/img/medal/gold.png";

const user_Id = sessionStorage.getItem("UserId");
const boardId = sessionStorage.getItem("BoardId");
const classId = sessionStorage.getItem("ClassId");
const langId = sessionStorage.getItem("LanguageId");

const Subject = () => {
  const location = useLocation();

  const [semesterLists, setSemesterLists] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [selectedSem, setSelectedSem] = useState("");
  const [chapterLevel, setChapterLevel] = useState([]);
  const [chapterIndex, setChapterpIndex] = useState("");
  const [addChapterList, setAddChapterList] = useState([]);
  const [editChapterList, setEditChapterList] = useState([]);
  const [semesterId, setSemesterId] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [selectedEditChaptertId, setSelectedEditChaptertId] = useState("");
  const [addChapterRenderData, setAddChapterRenderData] = useState("");
  const [editChapterRenderData, setEditChapterRenderData] = useState("");

  const [chapterNo, setChapterNo] = useState("");
  const [isEditChapterVisible, setIsEditChapterVisible] = useState(false);
  const [chapterLevelVisible, setchapterLevelVisible] = useState(false);

  const [chaptersNotAdded, setChaptersNotAdded] = useState(false);
  const [hideAddChapters, setHideAddChapters] = useState(false);
  const [hideEditButton, setHideEditButton] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getSemList();
  }, []);

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
    paddingBottom: "2rem",
  };

  const progress = location.state.subData.avg / 100;
  const max = 100;

  // console.log(" ======---> ", location.state.subData.avg);

  const createSemList = () => {
    const url = createSemesterListApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("add Semester response is : ", resp.data);
        getSemList();
      })
      .catch((err) => {
        console.log("Error in user Adding semester List --> ", err);
      });
  };

  const getSemList = () => {
    const url = getSemesterListApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };

    console.log("Semester list--- ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data.status === "false") {
          console.log("Please add sem");
        } else {
          setSemesterLists(resp.data.data);
          console.log(resp.data.data);
        }
      })
      .catch((error) => {
        console.log("Error -----> ", error);
      });
  };

  const handleSemester = (semId, index) => {
    setSemesterId(semId);
    getSemChapterList(semId, index);
    setIsEditChapterVisible(true);
    console.log("Sem id :>> ", semId);
  };

  const subjectAddChapters = () => {
    const url = getChaptersListApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      mode: "add",
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("Semester Chapter List--------->", resp.data.data);
        setAddChapterList(resp.data.data);
        setHideAddChapters(true);
        setHideEditButton(true);

        console.log("Add Chapter List--------->", addChapterList);
      })
      .catch((err) => {
        console.log("error in user chapterlist --> ", err);
      });
  };

  const subjectEditChapters = () => {
    const url = getChaptersListApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      mode: "edit",
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("Semester Chapter List--------->", resp.data.data);
        setEditChapterList(resp.data.data);
        setHideAddChapters(true);
        setHideEditButton(true);

        console.log("Add Chapter List--------->", editChapterList);
      })
      .catch((err) => {
        console.log("error in user chapterlist --> ", err);
      });
  };

  //  Add Chapter Api

  const handleAddChapterId = (id) => {
    console.log(id);
    let renderData = [...addChapterList];
    setSelectedChapterId([...selectedChapterId, id]);

    for (let data of renderData) {
      if (data.chapter_id == id) {
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    setAddChapterRenderData(renderData);
    setTimeout(() => {
      console.log("selected Add chapter array ", selectedChapterId);
    }, 500);
  };

  const addChapterButton = () => {
    var data = [];
    for (let index = 0; index < addChapterRenderData.length; index++) {
      addChapterRenderData[index].selected &&
        data.push(parseInt(addChapterRenderData[index].chapter_id));
    }
    console.log("list ", data, data.length);

    addChapters(data, data.length);
  };

  const addChapters = (chpId, chp_length) => {
    const url = addChapterApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      chapter_id: chpId,
      mode: "add",
      chapter_count: chp_length,
    };

    console.log("req body of add Chapter====", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("add chapter response is : ", resp.data);
      })
      .catch((error) => {
        console.log("error while adding chapter: ", error);
      });
  };

  // Edit Chapter Api

  const handleEditChapterId = (id) => {
    console.log("---------", id);
    let renderData = [...editChapterList];
    setSelectedEditChaptertId([...selectedEditChaptertId, id]);

    for (let data of renderData) {
      if (data.chapter_id == id) {
        // data.status = !data.status === "true" ? "false" : "true";
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    setEditChapterRenderData(renderData);
    console.log("selected Edit chapter array ", selectedEditChaptertId);
  };

  const editChapterButton = () => {
    var data = [];
    for (let index = 0; index < editChapterRenderData.length; index++) {
      editChapterRenderData[index].selected &&
        data.push(parseInt(editChapterRenderData[index].chapter_id));
    }
    console.log("list ", data, data.length);

    editChapters(data, data.length);
  };

  const editChapters = (chpId, chp_length) => {
    const url = addChapterApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      chapter_id: chpId,
      mode: "edit",
      chapter_count: chp_length,
    };
    console.log(" body of edit Chapter ---> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("add chapter response is : ", resp.data);
      })
      .catch((error) => {
        console.log("error while adding chapter: ", error);
      });
  };

  const getSemChapterList = (semId, index) => {
    setSelectedSem(index);
    const url = getSemesterChapterListApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      semester_id: semId,
    };
    console.log("req body==", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data.status === "false") {
          setChaptersNotAdded(true);
        } else {
          console.log("chapter list --->   ", resp.data.data);
          setChapterData(resp.data.data);
        }
        getSemList();
      })
      .catch((err) => {
        console.log("error in user semester list --> ", err);
      });
  };

  const handleChapterEvent = (id, index, chapterNo) => {
    setChapterpIndex(index + 1);
    setChapterNo(chapterNo);
    setTimeout(() => {
      console.log("chp id --> ", id, index + 1, chapterNo);
      getChapterLevel(id);
    }, 100);
  };

  const getChapterLevel = (chpId) => {
    const url = getChapterLevelApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      chapter_id: chpId,
    };
    console.log("sem list body ===> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setChapterLevel(resp.data.data);
        setchapterLevelVisible(true);
        console.log("chapter level List--->  ", resp.data.data);
      })
      .catch((err) => {
        console.log("Chapter Level error --> ", err);
      });
  };

  const handleChapterTestDescription = (id, level) => {
    console.log("subjectName---", subjectName);
    var levelInfo = 0;
    if (level == "Easy") {
      levelInfo = 1;
    } else if (level == "Medium") {
      levelInfo = 2;
    } else {
      levelInfo = 3;
    }
    console.log("--", levelInfo);
    return navigate("/chapterdescription", {
      state: {
        chapter_id: id,
        levelName: level,
        testlevel: levelInfo,
        allInfo: location.state.subData,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <div className="content pt-5 overflow-hidden">
          <div className="container col-12 col-lg-12 col-sm-12 col-md-12 ">
            <div
              className="card text-center col-12 m-auto"
              style={{
                borderRadius: "16px",
                boxShadow:
                  "0px 4.51015px 9.02029px 2.25507px rgba(199, 199, 199, 0.25) ",
              }}
            >
              <div className="d-flex justify-content-around text-center mt-3">
                <div className="flex-shrink-1 col-sm-12 col-lg-1 m-auto">
                  <img
                    src={location.state.subData.subject_icon}
                    alt=""
                    className=" subject_Logo "
                  />
                </div>
                <div className="col-sm-10">
                  <h3 className="sub-title mx-2" style={{ textAlign: "left" }}>
                    {location.state.subData.subject_name}
                  </h3>
                  <p className="mx-2" style={{ textAlign: "left" }}>
                    Chapters 14
                  </p>
                  <div className="col-sm-9 ">
                    <div className="slider mb-2 mt-2">
                      <div className="d-flex">
                        <div className=" w-100  gap-3">
                          <ProgressBar
                            now={progress / 100}
                            label={`${progress}%`}
                            max={100}
                          />
                        </div>
                        <div
                          className="flex-shrink-1"
                          style={{ marginTop: "-0.3rem", marginLeft: "0.5rem" }}
                        >
                          <span className="" style={{ top: "-2rem" }}>
                            {(progress / max) * 100}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center"
              style={{ paddingTop: "2rem" }}
            >
              <div
                className="d-flex justify-content-around"
                style={{ marginTop: "1rem" }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-xl px-5 mx-5"
                  onClick={() => createSemList()}
                >
                  Add Semester
                </button>
                {isEditChapterVisible && !chaptersNotAdded ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-xl px-5 mx-5"
                    onClick={() => subjectEditChapters()}
                  >
                    Edit Chapter
                  </button>
                ) : null}
              </div>

              {semesterLists.status === "false" ? (
                <div className="text-center">
                  <p style={{ color: "#1979c1", fontSize: "18px" }}>
                    Please Add Semester
                  </p>
                </div>
              ) : (
                <div className="col-12 col-sm-6 col-md-12 col-lg-6 m-auto">
                  <div className="d-flex flex-wrap mt-5">
                    <div className="row ">
                      {semesterLists.map((item, index) => (
                        <>
                          <div
                            onClick={() =>
                              handleSemester(item.semester_id, index)
                            }
                            className="subject col-12 col-md-2 col-sm-3 col-lg-2 mb-5 m-auto"
                          >
                            <img
                              src={semIcon}
                              alt="sem-img"
                              className="semImg semAdd mt-3"
                              key={index}
                              style={{
                                width: "100%",
                                height: "auto ",
                                border:
                                  selectedSem === index
                                    ? "3px solid #1979c1"
                                    : null,
                              }}
                            />
                            <br />
                            <h6 className=" text-center mt-3 fw-bold">
                              {item.semester_name}
                            </h6>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="container-fluid m-auto mt-5">
              <div className=" col-12 col-lg-12 container-fluid pt-2 pb-2 ">
                <div className="container-fluid col-sm-12">
                  {hideAddChapters ? null : chaptersNotAdded ? (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 mb-5 m-auto">
                      <button
                        onClick={() => subjectAddChapters()}
                        type="submit"
                        className="btn btn btn-block"
                        style={{
                          backgroundColor: "#1979C1",
                          color: "#ffffff",
                          borderRadius: "2rem",
                        }}
                      >
                        Add Chapters
                      </button>
                    </div>
                  ) : (
                    chapterData.map((data, index) => (
                      <>
                        <div
                          style={{ backgroundColor: "#fff", borderRadius: 10 }}
                          className="mb-4"
                        >
                          <div className="sub-header justify-content-between p-2 d-flex mb-3">
                            <div
                              className="w-75 mt-2"
                              style={{ padding: 5 }}
                              onClick={() => handleChapterEvent(data.id, index)}
                            >
                              <h5 style={{}}>
                                Chapter: {data.chapter_no}&nbsp;&nbsp;
                                {data.chapter_name}
                              </h5>
                            </div>
                          </div>
                          {data.chapter_no == chapterIndex ? (
                            <div>
                              {chapterLevel.map((item, index) => (
                                <div
                                  className="d-flex justify-content-around"
                                  onClick={() =>
                                    handleChapterTestDescription(
                                      item.chapter_id,
                                      item.level
                                    )
                                  }
                                >
                                  <div className="p-2 col-example">
                                    <img
                                      src={semIcon}
                                      alt="semIcon"
                                      key={index + item.id}
                                      style={{ width: "50px" }}
                                    />
                                  </div>
                                  <div className="p-2 col-example">
                                    <h6>{item.level}</h6>
                                  </div>
                                  <div
                                    className="col-example"
                                    style={{ fontSize: "2rem" }}
                                  >
                                    {item.medal_type === "" ? (
                                      <div>
                                        {item.status === "true" ? (
                                          <i className="bx bx-check text-success mr-3"></i>
                                        ) : (
                                          <i className="bx bxs-lock-alt  mr-2"></i>
                                        )}
                                      </div>
                                    ) : (
                                      <img
                                        src={
                                          item.medal_type === "Bronze"
                                            ? Bronze
                                            : item.medal_type === "Silver"
                                            ? Silver
                                            : item.medal_type === "Gold"
                                            ? Gold
                                            : null
                                        }
                                        alt="medal"
                                        key={index + item.id}
                                        style={{
                                          width: "50px",
                                          margin: "0.5rem",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </>
                    ))
                  )}

                  {hideEditButton && !chaptersNotAdded ? (
                    <div className="d-flex justify-content-between">
                      <h5 style={{ color: "#1979c1" }}>Edit Chapter</h5>
                      <div className="col-6 col-sm-6 col-md-4 col-lg-2 pb-4">
                        <div className="d-flex justify-content-end ">
                          <button
                            onClick={() => editChapterButton()}
                            type="submit"
                            className="btn btn btn-block"
                            style={{
                              backgroundColor: "#1979C1",
                              color: "#ffffff",
                              borderRadius: "2rem",
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {hideEditButton && chaptersNotAdded ? (
                    <div className="d-flex justify-content-between">
                      <h5 style={{ color: "#1979c1" }}>Add Chapter</h5>
                      <div className="col-6 col-sm-6 col-md-4 col-lg-2 pb-4">
                        <div className="d-flex justify-content-end ">
                          <button
                            onClick={() => addChapterButton()}
                            type="submit"
                            className="btn btn btn-block"
                            style={{
                              backgroundColor: "#1979C1",
                              color: "#ffffff",
                              borderRadius: "2rem",
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {addChapterList.map((data, index) => (
                    <div
                      style={{
                        borderRadius: 10,
                        backgroundColor: data.selected ? "#1979c1" : "#ffffff",
                        color: data.selected ? "#ffffff" : "black",
                      }}
                      className="mb-4"
                    >
                      <div className="sub-header justify-content-between p-2 d-flex mb-3">
                        <div
                          className="w-75 mt-2"
                          style={{
                            backgroundColor: data.selected
                              ? "#1979c1"
                              : "#ffffff",
                          }}
                          onClick={() => handleAddChapterId(data.chapter_id)}
                        >
                          <h5>
                            Chapter: {data.chapter_no}
                            {data.selected} &nbsp; &nbsp; {data.chapter_name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}

                  {editChapterList.map((data, index) => (
                    <div
                      style={{
                        borderRadius: 10,
                        backgroundColor: data.status ? "#1979c1" : "#ffffff",
                        color: data.status ? "#ffffff" : "black",
                      }}
                      className="mb-4"
                    >
                      <div className="sub-header justify-content-between p-2 d-flex mb-3" style={{
                            backgroundColor: data.status
                              ? "#1979c1"
                              : "#ffffff",
                              color: data.status ? "#ffffff" : "black",
                              borderRadius: 10,
                          }}>
                        <div
                          className="w-75 mt-2"
                          
                          onClick={() =>
                            handleEditChapterId(data.chapter_id, index)
                          }
                        >
                          <h5>
                            Chapter: {data.chapter_no}
                            {data.selected} &nbsp; &nbsp; {data.chapter_name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subject;
