<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\method\Helper;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use Helper;

    // to return posts
    public function index()
    {
        $posts = PostResource::collection(Post::all());
        return $this->responseJson(1,'data loaded',['posts'=> $posts]);
    }

    public function store(Request $request)
    {
        $validator = validator()->make($request->all(),[
            'title_ar' => 'required | string | min:3',
            'title_en' => 'required | string | min:3',
            'content_ar' => 'required',
            'content_en' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()){
            return $this->responseJson(0,$validator->errors()->first(),$validator->errors());
        }

//        Post::create($request->all());
        $post = new Post();
        $post->title = json_encode($request->only('title_ar','title_en'));
        $post->content = json_encode($request->only('content_ar','content_en'));
        $post->user_id = $request->user_id;
        $post->save();
        return $this->responseJson(1,'data stored successfully');
    }

    public function show($id)
    {
        $post = new PostResource(Post::find($id));
        return $this->responseJson(1,'loaded',['post'=> $post]);
    }

    public function update(Request $request, $id)
    {
        $validator = validator()->make($request->all(),[
            'title_ar' => 'required | string | min:3',
            'title_en' => 'required | string | min:3',
            'content_ar' => 'required',
            'content_en' => 'required',
        ]);

        if ($validator->fails()){
            return $this->responseJson(0,$validator->errors()->first(),$validator->errors());
        }

        $post = Post::find($id);
        if($post)
        {
            $post->title = json_encode($request->only('title_ar','title_en'));
            $post->content = json_encode($request->only('content_ar','content_en'));
            $post->save();
//          $post->update($request->all());
            return $this->responseJson(1,'data updated successfully');
        }
        else
        {
            return $this->responseJson(0,'Post not found');
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        $post = Post::find($id);
        if($post)
        {
            $post->delete();
            $this->responseJson(1,'post deleted successfully');
        }
        $this->responseJson(0,'try in another time');
    }
}
