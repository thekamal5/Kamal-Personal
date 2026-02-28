echo "🚀 Starting installation for Kamal Shrestha Media Platform..."

# 0. Root Dependencies
echo "📦 Installing Root dependencies..."
npm install

# 1. Frontend Dependencies
echo "📦 Installing Frontend dependencies..."
cd frontend
npm install framer-motion lucide-react clsx tailwind-merge next-themes @tanstack/react-query axios dayjs
cd ..

# 2. Backend Dependencies
echo "📦 Installing Backend dependencies..."
cd backend
npm install express prisma @prisma/client sharp dotenv cors jsonwebtoken bcryptjs
npm install -D typescript ts-node @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs @types/sharp
npx prisma generate
cd ..

echo "✅ Installation complete!"
echo "💡 To start the backend: cd backend && npm run dev"
echo "💡 To start the frontend: cd frontend && npm run dev"
echo "⚠️ Make sure to set up your DATABASE_URL in backend/.env before running."
