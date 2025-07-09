import { NavLink, useNavigate } from "react-router";

export const NoticeMain = () => {
  const navigate = useNavigate();
  const featuredPost = {
    title: 'Unlocking Business Efficiency with SaaS Solutions',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  };

  const otherPosts = [
    'Revolutionizing industries through SaaS implementation',
    'Synergizing saas and UX design for elevating digital experiences',
    'Navigating saas waters with intuitive UI and UX',
    'Sculpting saas success - the art of UI and UX design',
    'Transforming saas platforms - a UI/UX design odyssey',
  ];

  const recentPosts = [
    {
      title: 'Mastering UI Elements: A Practical Guide for Designers',
      desc: 'Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.',
      author: 'Jennifer Taylor',
      time: '3 min read',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
      country: 'USA',
      date: '1 JUL',
      subtitle: 'A guide to mastering UI elements for designers.',
      body: [
        'This article covers the essential UI elements every designer should know.',
        'Learn practical tips and the latest trends in UI design.'
      ],
      imageTitle: 'UI Elements',
      imageSubtitle: 'Design World'
    },
    {
      title: 'Crafting Seamless Experiences: The Art of Intuitive UI Design',
      desc: 'Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience.',
      author: 'Jennifer Taylor',
      time: '5 min read',
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5',
      country: 'UK',
      date: '15 JUN',
      subtitle: 'Principles and techniques for intuitive UI design.',
      body: [
        'Discover how to create seamless user experiences with intuitive UI design.',
        'Explore user-centric principles and techniques.'
      ],
      imageTitle: 'Intuitive UI',
      imageSubtitle: 'UX Best Practices'
    },
    {
      title: 'Beyond Aesthetics: The Power of Emotional UX Design',
      desc: 'Delve into the realm of emotional design and discover how incorporating empathy and psychology can elevate user experiences.',
      author: 'Ryan A.',
      time: '2 min read',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      country: 'RUSSIA',
      date: '3 OCT',
      subtitle: 'The Telegraph named world’s 10 best Christmas markets – and Moscow was included on the list.',
      body: [
        "Rating's authors were impressed by glowing festive installations, aromatic mulled wine, gingerbread with crispy glaze and crêpes with caviar. Besides, you can shop nice handmade presents and souvenirs, participate in various workshops and plunge into bright Christmas atmosphere.",
        "Christmas markets 2018–2019 in Moscow are going to be held around GUM and the Red Square. There you can enjoy dishes of traditional Russian cuisine and Russian interpretations of famous European drinks and snacks."
      ],
      imageTitle: 'Red Square',
      imageSubtitle: 'Plaza in Moscow, Russia'
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Featured Post & Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Featured Post */}
          <div className="flex-1">
            <div className="rounded-xl overflow-hidden shadow-lg relative h-64 md:h-80">
              <img src={featuredPost.image} alt="Featured" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <span className="bg-white/80 text-xs px-2 py-1 rounded mb-2 w-fit">{featuredPost.category}</span>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{featuredPost.title}</h2>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full md:w-80">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-semibold text-lg mb-4">Other featured posts</h3>
              <ul className="space-y-3">
                {otherPosts.map((post, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm text-gray-700 hover:underline cursor-pointer">{post}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Recent Posts */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-2xl">Recent Posts</h3>
            <div className="flex gap-2">
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-300">All Posts</button>
              <NavLink to="/add-notice" className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition">Add Post</NavLink>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border border-transparent hover:border-blue-400"
                onClick={() => navigate('/details-notice', { state: { post } })}
              >
                <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{post.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                    <span className="font-medium">{post.author}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
