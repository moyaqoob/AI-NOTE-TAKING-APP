import ProtectedRoute from "@/actions/middleware";
import Header from "@/components/Header";

function Home() {
  const user = null;

  const loading = false;
  return (
    <div>
      <ProtectedRoute>
        <Header />
      </ProtectedRoute>
    </div>
  );
}

export default Home;
