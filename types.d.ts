import { Connection } from "mongoose";
import { parseFallbackField } from "next/dist/lib/fallback";


declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null
    }
}

export {}