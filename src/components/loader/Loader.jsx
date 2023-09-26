import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.ContainerLoader}>
      <MagnifyingGlass
        height="320"
        width="320"
        ariaLabel="MagnifyingGlass-loading"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="transparent"
        color="#3f51b5"
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        visible={true}
      />
    </div>
  );
}
