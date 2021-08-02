import style from '../assets/styles/loading.module.scss';

const Loading = () => (
  <div className={style.loading}>
    <div className={style.loading__balls}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
