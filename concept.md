In real usecase, 
    you create a branch and work on some feature after finishing all the commit then only you push 
    after you push thhe code you create a pull request to merge to the main
    the reviewer will review your code if that's fine that he/shw will accept it and merge it to main
    after that to get the orignal state of the code base you must frequently pull the main. so, that you cant get merge conflict

In real project:
    there is two differnt server main and develop
    once you write a code then push that to the develop server with help of cicd, if the develop or test server is working fine
    then only you will merge that change again to the main server or the prod server. so, this is all automated with the help of cicd, means you will upload  a code, workflow pipeline is genereated and then it will show up.