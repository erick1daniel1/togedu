import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Heart, MessageCircle, Share2, Image, Send, MoreHorizontal, Repeat2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface Post {
  id: number;
  author: string;
  role: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Prof. Ana Martínez",
    role: "Profesora de Matemáticas",
    time: "Hace 2 horas",
    content: "Recordatorio: Mañana tendremos el examen de álgebra. Repasen los ejercicios del capítulo 5. ¡Mucho éxito a todos! 📚",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    author: "Laura Sánchez",
    role: "Estudiante - 3° Secundaria",
    time: "Hace 4 horas",
    content: "¡Nuestro equipo ganó el torneo de ciencias! 🏆 Gracias al Prof. Roberto por su apoyo. Aquí están las fotos del evento.",
    image: "https://images.unsplash.com/photo-1623303366639-0e330d7c3d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHNjaG9vbHxlbnwxfHx8fDE3NjEwNzc1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 45,
    comments: 12,
    isLiked: true,
  },
  {
    id: 3,
    author: "Dirección Académica",
    role: "Administración",
    time: "Hace 1 día",
    content: "Les informamos que el próximo lunes 28 no habrá clases por día festivo. Las actividades se retomarán el martes 29. ¡Disfruten su fin de semana largo!",
    likes: 67,
    comments: 15,
  },
];

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: "Carlos Rodríguez",
        role: "Estudiante",
        time: "Ahora",
        content: newPost,
        likes: 0,
        comments: 0,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-0">
          {/* Crear publicación */}
          <Card className="border-x-0 rounded-none border-t-0 shadow-none">
            <CardContent className="pt-4 pb-3">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-[#60a5fa] text-white">
                    CR
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="¿Qué está pasando?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px] resize-none border-[#e2e8f0] text-[15px] placeholder:text-[#94a3b8]"
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" size="sm" className="text-[#2563eb] hover:bg-[#eff6ff]">
                      <Image className="w-5 h-5" />
                    </Button>
                    <Button 
                      onClick={handleSubmitPost}
                      disabled={!newPost.trim()}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 rounded-full px-6"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map((post, index) => (
            <Card key={post.id} className="border-x-0 rounded-none border-t-0 shadow-none hover:bg-[#f8fafc] transition-colors cursor-pointer">
              <CardContent className="py-3 px-4">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#60a5fa] text-white">
                      {post.author.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[15px] text-[#1e293b] hover:underline">{post.author}</span>
                      {post.role === "Administración" && (
                        <Badge className="bg-[#fbbf24] text-[#1e293b] text-xs h-5">Admin</Badge>
                      )}
                      {post.role.includes("Profesor") && (
                        <Badge className="bg-[#60a5fa] text-white text-xs h-5">Profesor</Badge>
                      )}
                      <span className="text-[#64748b] text-sm">· {post.time}</span>
                      <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 hover:bg-[#eff6ff] hover:text-[#2563eb]">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-[13px] text-[#64748b] mb-2">{post.role}</p>
                    
                    {/* Content */}
                    <p className="text-[15px] text-[#1e293b] mb-3 leading-normal">{post.content}</p>
                    
                    {/* Image */}
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] mb-3">
                        <ImageWithFallback
                          src={post.image}
                          alt="Post image"
                          className="w-full max-h-96 object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between max-w-md mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`hover:bg-[#fef2f2] hover:text-[#ef4444] ${post.isLiked ? "text-[#ef4444]" : "text-[#64748b]"} -ml-2 px-2 h-8`}
                      >
                        <Heart className={`w-[18px] h-[18px] mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                        <span className="text-[13px]">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-[#eff6ff] hover:text-[#2563eb] text-[#64748b] px-2 h-8">
                        <MessageCircle className="w-[18px] h-[18px] mr-2" />
                        <span className="text-[13px]">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-[#f0fdf4] hover:text-[#10b981] text-[#64748b] px-2 h-8">
                        <Repeat2 className="w-[18px] h-[18px] mr-2" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-[#eff6ff] hover:text-[#2563eb] text-[#64748b] px-2 h-8">
                        <Share2 className="w-[18px] h-[18px]" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
