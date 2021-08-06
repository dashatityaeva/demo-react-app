import preloader from '../../../assets/preloader.svg';

type PropsType = {}

const Preloader: React.FC = () => {
    return (
        <div style={{backgroundColor: 'white'}}>
            <img alt="preloader" src={preloader}/> 
        </div>
    )
}

export default Preloader;