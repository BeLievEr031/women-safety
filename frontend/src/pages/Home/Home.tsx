import Button from '../../components/Button'
import Navbar from '../../components/ui/Navbar'
import videoSrc from "../../assets/video.mp4"
import { FaPlay } from "react-icons/fa";
import { useRef, useState } from 'react';
import { CiBellOn } from "react-icons/ci";
import { GrMapLocation } from "react-icons/gr";
import { FiUserCheck } from "react-icons/fi";
import FeatureCard from '../../components/FeatureCard';
import Footer from '../../components/ui/Footer';
function Home() {
    const videoRef = useRef<HTMLVideoElement>(null!);
    const [isPlay, setPlay] = useState(false)
    const handleVideoClick = () => {
        console.log(videoRef.current);

        if (videoRef.current.paused) {
            setPlay(true);
            videoRef.current.play();
        } else {
            setPlay(false);
            videoRef.current.pause();
        }
    };
    return (
        <div>
            <Navbar />
            <div className='flex flex-col justify-center items-center pt-8'>
                <h1 className='text-[64px] font-bold text-center font-archivo'>
                    Empower Women's
                    <br />
                    Safety
                </h1>
                <p className='font-semibold text-slate-950/80 text-xl my-4'>Join us in creating a safer world for women.</p>
                <div className='flex gap-2 mt-4'>
                    <Button className='px-8 py-2  font-archivo'>Join us now</Button>
                    <Button variant='outline' className='px-4 py-2 font-archivo'>Request a demo</Button>
                </div>

                <div className='w-11/12 h-[650px] mt-16 relative'>
                    <video src={videoSrc} ref={videoRef} className='w-full rounded-2xl h-full object-cover' />
                    <div className='absolute top-0 left-0 w-full rounded-2xl h-full cursor-pointer bg-black/50 flex justify-center items-center' onClick={handleVideoClick}>
                        {!isPlay && <FaPlay color='white' size={80} className='pointer-events-auto' />}
                    </div>
                </div>

                <div className='w-11/12 max-w-5xl mx-auto grid grid-cols-3 gap-4 mt-14'>
                    <FeatureCard icon={CiBellOn} title='Emergency Alert System'
                        description='Learn how this feature enhances your safety by alerting contacts in case of emergencies.'
                    />
                    <FeatureCard icon={GrMapLocation} title='Real-Time Location Tracking'
                        description='Discover how this feature keeps your loved ones informed about your whereabouts.'
                    />
                    <FeatureCard icon={FiUserCheck} title='Safety Tips'
                        description='Access valuable safety advice and tips through this comprehensive resource.'
                    />

                </div>


                <Footer />
            </div>
        </div>
    )
}

export default Home