
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  Send,
  Tag,
  Filter,
  PlusCircle,
  MessageSquareMore,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Community = () => {
  const discussionPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://placehold.co/100/8b5cf6/FFFFFF/png?text=SJ",
      },
      title: "Help with recursive algorithms?",
      content:
        "I'm struggling to understand how to implement efficient recursive solutions for tree traversal problems. Can anyone explain or point me to good resources?",
      tags: ["algorithms", "recursion", "trees"],
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      isLiked: true,
    },
    {
      id: 2,
      author: {
        name: "Michael Chen",
        username: "mchen",
        avatar: "https://placehold.co/100/4f46e5/FFFFFF/png?text=MC",
      },
      title: "Database indexing strategies",
      content:
        "What's the best approach for indexing a database table with frequent reads but occasional updates? I'm trying to optimize my application's performance.",
      tags: ["databases", "optimization", "indexing"],
      timestamp: "1 day ago",
      likes: 24,
      comments: 8,
      isLiked: false,
    },
    {
      id: 3,
      author: {
        name: "Aisha Patel",
        username: "aishap",
        avatar: "https://placehold.co/100/6366f1/FFFFFF/png?text=AP",
      },
      title: "Understanding Python decorators",
      content:
        "I'm having trouble grasping how Python decorators work and when I should use them in my code. Can someone provide a simple explanation with examples?",
      tags: ["python", "decorators", "functions"],
      timestamp: "3 days ago",
      likes: 31,
      comments: 12,
      isLiked: false,
    },
  ];

  const popularTags = [
    { name: "python", count: 234 },
    { name: "algorithms", count: 186 },
    { name: "databases", count: 142 },
    { name: "web-dev", count: 123 },
    { name: "machine-learning", count: 97 },
  ];

  const topContributors = [
    {
      name: "Alex Rivera",
      username: "alexr",
      avatar: "https://placehold.co/100/3730a3/FFFFFF/png?text=AR",
      points: 1250,
    },
    {
      name: "Priya Shah",
      username: "pshah",
      avatar: "https://placehold.co/100/4f46e5/FFFFFF/png?text=PS",
      points: 1120,
    },
    {
      name: "Jordan Lee",
      username: "jlee",
      avatar: "https://placehold.co/100/6366f1/FFFFFF/png?text=JL",
      points: 965,
    },
  ];

  return (
    <Layout title="Community">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Create a Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Title" />
                <Textarea placeholder="What would you like to discuss?" />
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex gap-2 items-center">
                    <Tag className="h-4 w-4" />
                    <Input
                      placeholder="Add tags (comma separated)"
                      className="w-full sm:w-64"
                    />
                  </div>
                  <Button className="flex items-center gap-2">
                    <MessageSquareMore className="h-4 w-4" />
                    Post Discussion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Discussion Feed</h2>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 sm:mt-0">
              <Select defaultValue="latest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {discussionPosts.map((post) => (
            <Card key={post.id} className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}{post.author.name.split(" ")[1][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      @{post.author.username} • {post.timestamp}
                    </p>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} className="bg-secondary text-secondary-foreground">{tag}</Badge>
                  ))}
                </div>

                <div className="flex justify-between border-t pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 ${
                      post.isLiked ? "text-brand-600" : ""
                    }`}
                  >
                    <ThumbsUp
                      className={`h-4 w-4 ${post.isLiked ? "fill-brand-600" : ""}`}
                    />
                    {post.likes}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {post.comments} Comments
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-muted-foreground"
                  >
                    <Flag className="h-4 w-4" />
                    Report
                  </Button>
                </div>

                {post.id === 1 && (
                  <div className="mt-4 border-t pt-4">
                    <div className="flex gap-3 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <span className="font-semibold text-sm">Alex Rivera</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            30 min ago
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          I recommend checking out the "Recursion for Beginners" series on CS Simplified. It helped me understand tree traversal algorithms so much better!
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <Input 
                        placeholder="Write a comment..." 
                        className="flex-grow"
                      />
                      <Button size="icon" variant="ghost">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More</Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <MessageSquare className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-2xl font-bold">3,842</div>
                  <p className="text-sm text-muted-foreground">Discussions</p>
                </div>
              </div>
              <Button className="w-full mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name[0]}{contributor.name.split(" ")[1][0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contributor.name}</p>
                        <p className="text-sm text-muted-foreground">@{contributor.username}</p>
                      </div>
                    </div>
                    <div className="text-brand-600 font-bold">{contributor.points}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <div
                    key={tag.name}
                    className="px-3 py-1 bg-secondary rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{tag.name}</span>
                    <span className="bg-secondary-foreground/20 text-secondary-foreground px-1.5 rounded-full text-xs">
                      {tag.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
