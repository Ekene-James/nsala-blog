import {
  GET_DATA_FROM_FIREBASE,
  IS_LOADING,
  GET_SINGLE_BLOG_POST,
  BUTTON_LOADING,
  BUTTON_SUCCESS,
  GET_COMMENTS,
  GET_BLOG_TOTAL,
  GET_SIDEBAR_DATA,
  ADD_COUNTER,
  REDUCE_COUNTER,
  ADD_COMMENT,
  GET_RELATED_BLOGS
} from "../type";
import firebase, { firestore, storage } from "../../utils/firebase";
let last;
let first;


export const isLoading = () => {
  return {
    type: IS_LOADING
  };
};

export const getSidebar = () => dispatch => {
  return firestore
    .collection("blogMeta")
    .orderBy("totalComments", "desc")
    .limit(8)
    .get()
    .then(snapshot => {
      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt,
          totalComments,
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
          totalComments,
          name
        };
      });

      return dispatch({
        type: GET_SIDEBAR_DATA,
        payload: stuffs
      });
    })
    .catch(err => {
      console.log("Error getting sidebar documents", err);
    });
};
export const getBlogTotal = () => dispatch => {
  return firestore
    .collection("blogTotal")
    .doc("eachCategoryTotal")
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();

        return dispatch({
          type: GET_BLOG_TOTAL,
          payload: data
        });
      }
    })
    .catch(err => {
      console.log("Error getting blogTotal documents", err);
    });
};

export const getAllBlogs = () => dispatch => {
  dispatch(isLoading());
  return firestore
    .collection("blogMeta")
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
        type: GET_DATA_FROM_FIREBASE,
        payload: stuffs
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

export const nextQuery = () => dispatch => {
  dispatch(isLoading());
 return firestore
    .collection("blogMeta")
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
        type: GET_DATA_FROM_FIREBASE,
        payload: stuffs
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

export const previousQuery = () => dispatch => {
  dispatch(isLoading());
 return firestore
    .collection("blogMeta")
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
        type: GET_DATA_FROM_FIREBASE,
        payload: stuffs
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

export const getSinglePost = (id, history) => dispatch => {
  dispatch(isLoading());
  let keyword;
  history.push(`/blog/${id}`)
  return firestore
    .collection("blogPosts")
    .doc(`${id}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();

        const {
          category,
          BlogImgUrl,
          title,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt,
          text,
          totalComments,
          name
        } = data;
        const id = doc.id;

        const datum = {
          id,
          category,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl,
          text,
          totalComments,
          name
        };

        const smallLetter = data.title.toLowerCase();
        const seperate = smallLetter.split(" ");
        keyword = seperate;

        return dispatch({
          type: GET_SINGLE_BLOG_POST,
          payload: datum
        });
      }
    })
    .then(() => {
      return firestore
        .collection("blogPosts")
        .doc(`${id}`)
        .collection("comments")
        .orderBy("creatAt", "asc")
        .get()
        .then(snapshot => {
          const comments = snapshot.docs.map(doc => {
            const data = doc.data();
            return { ...data, creatAt: data.creatAt.seconds };
          });
          return dispatch({
            type: GET_COMMENTS,
            payload: comments
          });
        });
    })
    .then(() => {
      return firestore
        .collection("blogMeta")
        .where("keywords", "array-contains-any", keyword)
        .orderBy("creatAt", "desc")
        .limit(5)
        .get()
        .then(snapshot => {
          // Get the last document

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
            type: GET_RELATED_BLOGS,
            payload: stuffs
          });
        });
    })
    .catch(err => {
      console.log(`"Error getting document", ${err} ,,,end of error`);
    });
};
export const addComment = (data, id) => dispatch => {
  dispatch(buttonLoading());

  return firestore
    .collection("blogPosts")
    .doc(id)
    .collection("comments")
    .add({
      commentor: data.commentor,

      comment: data.comment,

      email: data.email,
      creatAt: Date.now()
      // creatAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      const userRef = firestore.collection("blogPosts").doc(id);
      const increaseBy = firebase.firestore.FieldValue.increment(1);
      userRef.update({ totalComments: increaseBy });
    })
    .then(() => {
      const blogMetaRef = firestore.collection("blogMeta").doc(id);
      const increaseBy = firebase.firestore.FieldValue.increment(1);
      blogMetaRef.update({ totalComments: increaseBy });
    })
    .then(() => {
      const comment = { ...data, creatAt: Date.now() };
      dispatch({
        type: ADD_COMMENT,
        payload: comment
      });
      dispatch(buttonSuccess());
    })
    .catch(err => {
      console.log("Error posting document", err);
    });
};
export const buttonLoading = () => {
  return {
    type: BUTTON_LOADING
  };
};
export const buttonSuccess = () => {
  return {
    type: BUTTON_SUCCESS
  };
};
export const addCounter = () => dispatch => {
  dispatch({
    type: ADD_COUNTER
  });
};
export const reduceCounter = () => dispatch => {
  dispatch({
    type: REDUCE_COUNTER
  });
};
