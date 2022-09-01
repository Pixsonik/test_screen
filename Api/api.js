const url = 'https://testmate.in/api/';
// const url = 'http://localhost/api/';
// https://testmate.in/api/user_login.php

export const urlToken = '6808';

export const userSubjectApi = () => {
    return `${url}get_subject_user.php`
}

export const addChapterApi = () => {
    return `${url}add_chapter.php`
}

export const createSemesterListApi = () => {
    return `${url}create_semester.php`
}

export const getChapterLevelApi = () => {
    return `${url}get_chapter_level.php`
}

export const getChaptersListApi = () => {
    return `${url}get_chapter_list.php`
}

export const getSemesterChapterListApi = () => {
    return `${url}get_semester_chapter.php`
}

export const getSemesterListApi = () => {
    return `${url}list_semester.php`
}

export const chapterTestQuestionApi = () => {
    return `${url}get_chapter_question.php`
}

export const testSessionApi = () => {
    return `${url}get_start_test.php`
}

export const submitAnswerApi = () => {
    return `${url}insert_chapter_question.php`
}

export const submitTestApi = () => {
    return `${url}submit_chapter_question.php`
}
