import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { constructorThunk } from '../../features/constructorSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { userThunk } from '../../features/userSlice';
import { ProtectedRoute } from '../protectedRoute';

const App = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const promise = dispatch(constructorThunk());
    const userPromise = dispatch(userThunk());

    return () => {
      promise.abort();
      userPromise.abort();
    };
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route>
          <Route
            path='/login'
            element={
              <ProtectedRoute protectionType='noAuthRequired'>
                <Login />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            path='/register'
            element={
              <ProtectedRoute protectionType='noAuthRequired'>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute protectionType='noAuthRequired'>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute protectionType='noAuthRequired'>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />{' '}
      </Routes>
    </div>
  );
};
export default App;
