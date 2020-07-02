#include <stdio.h>
extern "C" {
int myadd(int a,int b){
  int res = a+b;
  res = res + 2;
  return res;
}
int main(){

    int res = myadd(1,2);
    printf("res: %d\n",res);
}

}