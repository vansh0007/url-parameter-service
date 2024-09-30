"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const linkRoutes_1 = require("./routes/linkRoutes");
const errorHandler_1 = require("./middlewares/errorHandler");
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
// Middleware
app.use(express_1.default.json());
app.use(cors());
// Error handler
app.use(errorHandler_1.errorHandler);
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        yield mongoose_1.default.connect((_b = process.env.MONGODB_URI) !== null && _b !== void 0 ? _b : "mongodb+srv://vanshbhatia9:V3h14BR72YsM00In@cluster.onwa0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster", {});
        console.log('Connected to MongoDB Atlas');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
connectDB();
// Routes
app.use('/api', linkRoutes_1.urlRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
