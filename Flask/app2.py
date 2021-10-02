from flask import Flask,jsonify,request,make_response
import requests, json

app = Flask(__name__)


@app.route('/test', methods=['GET','POST'])
def test():
    if request.method == 'GET':
    
        return make_response('failure')
    if request.method == 'POST':
        t_id = request.json['id']
        t_name = request.json['name']
        created_on = request.json['created_on']
        modified_on = request.json['modified_on']
        desc = request.json['desc']
        print(str(t_id))
        create_row_data = {'id': str(t_id),'name':str(t_name),'created-on':str(created_on),'modified-on':str(modified_on),'desc':str(desc)}

        return make_response("True")

if __name__ == '__main__':
    app.run(host='localhost',debug=False, use_reloader=True)