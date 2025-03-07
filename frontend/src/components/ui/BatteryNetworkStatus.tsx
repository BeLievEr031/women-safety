/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import mscSrc from "../../assets/offline.mp3"
interface BatteryManager extends EventTarget {
    level: number;
    charging: boolean;
    addEventListener: (type: string, listener: (event: Event) => void) => void;
}

const BatteryNetworkStatus: React.FC = () => {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [isCharging, setIsCharging] = useState<boolean | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const adRef = useRef<HTMLAudioElement | null>(null)
    useEffect(() => {
        const getBatteryStatus = async () => {
            if ("getBattery" in navigator) {
                // ✅ Type assertion: telling TypeScript that navigator.getBattery() returns a BatteryManager
                const battery = (await (navigator as any).getBattery()) as BatteryManager;

                setBatteryLevel(Math.round(battery.level * 100));
                setIsCharging(battery.charging);

                battery.addEventListener("levelchange", () =>
                    setBatteryLevel(Math.round(battery.level * 100))
                );
                battery.addEventListener("chargingchange", () =>
                    setIsCharging(battery.charging)
                );
            } else {
                console.warn("Battery API not supported in this browser.");
            }
        };

        getBatteryStatus();

        // 🌐 Network Status Listeners
        const updateOnlineStatus = (st: string) => {
            if (adRef && st === "off") {
                adRef.current?.play();
            }
            setIsOnline(navigator.onLine)
        };

        window.addEventListener("online", () => updateOnlineStatus("on"));
        window.addEventListener("offline", () => updateOnlineStatus("off"));

        // Cleanup event listeners
        return () => {
            window.removeEventListener("online", () => updateOnlineStatus("on"));
            window.addEventListener("offline", () => updateOnlineStatus("off"));
        };
    }, []);

    return (
        <div className="p-4 text-center fixed right-4 bottom-4">
            {/* 🔋 Battery Status */}
            {batteryLevel !== null && (
                <p>
                    🔋 Battery Level: <strong>{batteryLevel}%</strong> {isCharging ? "⚡ Charging" : ""}
                </p>
            )}

            {/* ⚠️ Low Battery Warning */}
            {batteryLevel !== null && batteryLevel <= 20 && !isCharging && (
                <p className="text-red-500 font-semibold">⚠️ Battery is low! Please charge soon.</p>
            )}

            {/* 🌐 Internet Status */}
            <p>
                🌍 Internet Status:{" "}
                <strong className={isOnline ? "text-green-500" : "text-red-500"}>
                    {isOnline ? "Online ✅" : "Offline ❌"}
                </strong>
            </p>

            {/* ⚠️ Disconnection Warning */}
            {!isOnline && (
                <p className="text-red-500 font-semibold">
                    ⚠️ No internet connection! Please check your network.
                </p>
            )}

            <audio src={mscSrc} ref={adRef}></audio>
        </div>
    );
};

export default BatteryNetworkStatus;
