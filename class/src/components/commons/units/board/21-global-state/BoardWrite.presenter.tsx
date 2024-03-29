import { useRecoilState } from "recoil";
import { isEditState } from "../../../../../commons/store/index";

export default function GlobalStatePresenter() {
  const [isEdit] = useRecoilState(isEditState);
  return <div>{isEdit ? "수정하기" : "등록하기"}</div>;
}
