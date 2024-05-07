
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    // console.log("AT middleware code: ",err.code);
    // console.log("AT middleware msg: ",err.meta.cause);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status:err.statusCode,
            success: false,
            message: err.message,
            errors: err.errors,
            data: err.data
        });
    }
    else if(err instanceof Prisma.PrismaClientKnownRequestError){
        res.json({
            status:err.code,
            success: false,
            message: err.message || err.meta?.message || err.meta?.cause || "Prisma known request error",
            errors: err.meta || err.meta?.errors || [],
            data: null
        });
    }
    else if(err instanceof Prisma.PrismaClientValidationError){
        res.json({
            status:err.code,
            success: false,
            message: err.message || err.meta?.message || err.meta?.cause || "Prisma validation error",
            errors: err.meta || err.meta?.errors || [],
            data: null
        });
    }
    else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        res.json({
            status:err.code,
            success: false,
            message: err.message || err.meta?.message || err.meta?.cause || "Prisma unknown request error",
            errors: err.meta || err.meta?.errors || [],
            data: null
        });
    }
    else if(err instanceof Prisma.PrismaClientInitializationError){
        res.json({
            status:err.code,
            success: false,
            message: err.message || err.meta?.message || err.meta?.cause || "Prisma initialization  error",
            errors: err.meta || err.meta?.errors || [],
            data: null
        });
    }
    else if(err instanceof Prisma.PrismaClientRustPanicError){
        res.json({
            status:err.code,
            success: false,
            message: err.message || err.meta?.message || err.meta?.cause || "Prisma rust panic error",
            errors: err.meta || err.meta?.errors || [],
            data: null
        });
    }
    else {
        // console.error('Unhandled error:', err);
        res.status(500).json({
            status:500,
            success: false,
            message: 'Internal Server Error',
            errors: [],
            data: null
        });
    }
};

export default errorHandler
