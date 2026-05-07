"use server";

import prisma from "@/lib/prisma";
import os from "os";

export async function getSystemPerformance() {
    
    const start = Date.now();
    let dbStatus = "OPERATIONAL";
    try {
        await prisma.$queryRaw`SELECT 1`;
    } catch (e) {
        dbStatus = "DEGRADED";
    }
    const dbLatency = Date.now() - start;

    const uptime = os.uptime(); 
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const memUsage = Math.round(((totalMem - freeMem) / totalMem) * 100);
    const cpuLoad = os.loadavg()[0]; 

    return {
        db: {
            status: dbStatus,
            latency: dbLatency
        },
        server: {
            uptime,
            memory: memUsage,
            cpu: Math.round(cpuLoad * 100) / 100,
            platform: os.platform(),
            arch: os.arch()
        },
        timestamp: new Date().toISOString()
    };
}
