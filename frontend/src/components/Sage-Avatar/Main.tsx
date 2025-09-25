import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "./UI";
import {Experience} from "@/components/Sage-Avatar/Experience.tsx";
import {ChatProvider} from "@/components/Sage-Avatar/useChat.tsx";

const Main=()=>{
    return (
        <ChatProvider>
            <Loader />
            <Leva hidden />
            <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
                <Experience />
            </Canvas>
            <UI />
        </ChatProvider>
    )
}
export default Main;