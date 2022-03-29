//container
import { ChangeEvent, useState  } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT,FETCH_BOARD_COMMENTS } from "./BoardCommentWrite.queries";
import CommentWriteUI from "./BoardCommentWrite.presenter";
import { useRouter } from "next/router";





export default function CommentWrite() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [value, setRating] = useState(5);

  

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

    const handleChange = (value:any) => {
      setRating(value);
    };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    if (
      event.target.value !== "" &&
      password !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (
      writer !== "" &&
      event.target.value !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };


  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (
      writer !== "" &&
      password !== "" &&
      event.target.value &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onClickWriteComment = async () => {
      console.log("router",router);
      
    if (writer === "") {
      alert("이름을 입력해 주세요");
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
    }
    if (contents === "") {
      alert("내용을 입력해주세요");
    }

    if (writer !== "" && password !== "" && contents !== "" ){
      alert("댓글 등록에 성공했습니다!");
    } 

      try {
          await createBoardComment({
          variables: {
            createBoardCommentInput:{
              writer: writer,
              password: password,
              contents: contents,
              rating: Number(value)
            },
            boardId: String(router.query.boardId)
          },
          refetchQueries:[{query: FETCH_BOARD_COMMENTS,
          variables:{boardId: String(router.query.boardId)}}]
        });
        setWriter("");
        setPassword("");
        setContents("");
        // console.log("comment result",result)

      }catch (error) {
        if (error instanceof Error) alert(error.message);
    }


  };

 

  return (
    <CommentWriteUI
      onClickWriteComment={onClickWriteComment}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      isActive={isActive}
      contents={contents}
      writer={writer}
      password={password}
      handleChange={handleChange}
      value={value}

    />
  );
}