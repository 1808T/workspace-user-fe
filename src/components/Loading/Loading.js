import CircularProgress from '@mui/material/CircularProgress';
import classes from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={classes['loading']}>
      <CircularProgress />
    </div>
  );
}
