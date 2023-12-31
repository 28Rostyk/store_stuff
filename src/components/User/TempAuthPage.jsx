import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";

// import { googleAuth } from "redux/user/userOperations";
import { googleAuth } from "../../features/user/userOperation";
import { memoizedSelectLoginAndToken } from "../../features/user/useSelectors";
import { ROUTES } from "../../utils/routes";
import Loader from "../../shared/Loader/Loader";

const TempAuthPage = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("refreshToken", refreshToken);
    if (accessToken) {
      dispatch(googleAuth(accessToken));
    }
  }, [accessToken, refreshToken, dispatch]);

  const { isLogin } = useSelector(memoizedSelectLoginAndToken);

  if (!isLogin && accessToken) {
    return <>{<Loader />}</>;
  }

  if (isLogin) {
    return <Navigate to={ROUTES.CART} replace />;
  }
  return null;
};
export default TempAuthPage;
