import { firestore } from "../../utils/firebase";
import {
  GET_CATEGORY,
  IS_LOADING,
  GET_SEARCH,
  ERRORS,
  GET_PROFILE_INFO
} from "../type";
import { getBlogTotal, buttonLoading, buttonSuccess } from "./blogPostActions";
let last;
let first;
export const isLoading = () => {
  return {
    type: IS_LOADING
  };
};

export const getSearch = (search, history) => dispatch => {
  dispatch(isLoading());

  const smallLetter = search.toLowerCase();
  const seperate = smallLetter.split(" ");
  return firestore
    .collection("blogMeta")
    .where("keywords", "array-contains-any", seperate)
    .get()
    .then(snapshot => {
      // Get the last document is

      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt,
          name
        } = data;
        const id = doc.id;

        return {
          id,
          category,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl,
          search,
          name
        };
      });

      return dispatch({
        type: GET_SEARCH,
        payload: stuffs
      });
    })
    .then(() => history.push(`/search/${search}`))
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
export const getCategory = (category, history) => dispatch => {
  dispatch(getBlogTotal());
  dispatch(isLoading());

  return firestore
    .collection("blogMeta")
    .where("category", "==", category)
    .orderBy("creatAt", "desc")
    .limit(3)
    .get()
    .then(snapshot => {
      // Get the last document
      last = snapshot.docs[snapshot.docs.length - 1];
      first = snapshot.docs[0];

      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt,
          name
        } = data;
        const id = doc.id;

        return {
          id,
          category,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl,
          name
        };
      });

      return dispatch({
        type: GET_CATEGORY,
        payload: stuffs
      });
    })
    .then(() => history.push(`/category/${category}`))
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

export const nextCategory = category => dispatch => {
  dispatch(buttonLoading());
  return firestore
    .collection("blogMeta")
    .where("category", "==", category)
    .orderBy("creatAt", "desc")
    .startAfter(last.data().creatAt)
    .limit(3)
    .get()
    .then(snapshot => {
      // Get the last document

      last = snapshot.docs[snapshot.docs.length - 1];
      first = snapshot.docs[0];

      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt,
          name
        } = data;
        const id = doc.id;

        return {
          id,
          category,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl,
          name
        };
      });

      return dispatch({
        type: GET_CATEGORY,
        payload: stuffs
      });
    })
    .then(() => dispatch(buttonSuccess()))
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
export const previousCategory = category => dispatch => {
  dispatch(buttonLoading());
  return firestore
    .collection("blogMeta")
    .where("category", "==", category)
    .orderBy("creatAt", "asc")
    .startAfter(first.data().creatAt)
    .limit(3)
    .get()
    .then(snapshot => {
      // Get the last document
      last = snapshot.docs[0];
      first = snapshot.docs[snapshot.docs.length - 1];

      const stuffs = snapshot.docs
        .map(doc => {
          const data = doc.data();
          const {
            category,
            BlogImgUrl,
            title,
            bloggerId,
            bloggerProfileImgUrl,
            creatAt,
            name
          } = data;
          const id = doc.id;

          return {
            id,
            category,
            bloggerId,
            bloggerProfileImgUrl,
            creatAt: creatAt.seconds,
            title,
            BlogImgUrl,
            name
          };
        })
        .sort((a, b) => b.creatAt - a.creatAt);

      return dispatch({
        type: GET_CATEGORY,
        payload: stuffs
      });
    })
    .then(() => dispatch(buttonSuccess()))
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
export const getProfileInfo = id => dispatch => {
  dispatch(isLoading());
  firestore
    .collection("users")
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        dispatch({
          type: GET_PROFILE_INFO,
          payload: doc.data()
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
