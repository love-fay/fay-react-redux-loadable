import * as React from 'react';

interface Props {
		info?: string | React.ElementType,
		children: any
}

interface State {
		hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State>{

		constructor(props: Readonly<Props>){
				super(props);
				this.state={
						hasError: false,
				}
		}

		componentDidCatch(){
				this.setState({hasError: true});
		}

		goBack = () => {
				window.history.go(-1);
		};

		goHome = () => {
				window.location.href = '/';
		};

		render(){
				if(this.state.hasError){
						const {info} = this.props;
						return <h1>{info ||<div>页面出现错误,加载失败</div>}</h1>;
				}
				return this.props.children;
		}
}
