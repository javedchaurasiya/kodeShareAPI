class Solution {
public:
    int maximalSquare(vector<vector<char>>& v) {
        
        if(v.size()==0 || v[0].size()==0)return 0;
        int m=v.size(),n=v[0].size();
        int dp[m+1][n+1];
        memset(dp,0,sizeof(dp));
        int ans=0;
        for(int i=1;i<=m;i++)
        {
            for(int j=1;j<=n;j++)
            {
                if(v[i-1][j-1]=='1')
                {
                    dp[i][j]=1+min(dp[i-1][j],min(dp[i][j-1],dp[i-1][j-1]));
                     ans=max(ans,dp[i][j]);
                }
               
            }
        }
        return ans*ans;
        
    }
};