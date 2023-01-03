import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

export const useSocket = () => {
    const [io, setIO] = useState();

    useEffect(() => {
        const ioClient = socketIOClient("http://localhost:7777", { transports: ["websocket"], auth: {token: Cookies.get('session')} });
        setIO(ioClient);

        ioClient.on('connect', () => {
            if(window.emitQueue) {
                window.emitQueue.forEach((toEmit) => {
                    ioClient.emit(toEmit.msg, toEmit.data, toEmit.cb)
                })
            }
            if(window.onQueue) {
                window.onQueue.forEach((toOn) => {
                    ioClient.on(toOn.msg, toOn.cb)
                })
            }
            if(window.offQueue) {
                window.offQueue.forEach((toOff) => {
                    ioClient.off(toOff.msg)
                })
            }
        });

        // CLEAN UP THE EFFECT
        return () => ioClient.disconnect();
    }, [])
    
    const socket = {};
    socket.emit = (msg, data, cb = () => {}) => {
        if(io) {
            io.emit(msg, data, cb)
        } else {
            if(window.emitQueue) {
                window.emitQueue.push({msg: msg, data: data, cb: cb})
            } else {
                window.emitQueue = []
            }
        }
    }
    
    socket.on = (msg, cb) => {
        if(io) {
            io.on(msg, cb)
        } else {
            if(window.onQueue) {
                window.onQueue.push({msg: msg, cb: cb})
            } else {
                window.onQueue = []
            }
        }
    }
    
    socket.off = (msg) => {
        if(io) {
            io.off(msg)
        } else {
            if(window.offQueue) {
                window.offQueue.push({msg: msg})
            } else {
                window.offQueue = []
            }
        }
    }

    return socket;
};